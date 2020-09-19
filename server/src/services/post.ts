import { db } from '../database';
import { AppError } from '../utils';
import { userSerializer } from '../utils/serializer';
import { uploadFromBuffer } from '../utils/uploadFromBuffer';
import { User } from './auth';

interface Post {
  id: number;
  user_id: number;
  caption: string;
  updated_at: string;
  created_at: string;
}

interface PostMedia {
  id: number;
  public_id: number;
  media_type: string;
  media_url: string;
  updated_at: string;
  created_at: string;
}

interface PostLike {
  post_id: number;
  user_id: number;
  updated_at: string;
  created_at: string;
}

export const uploadMedia = async (
  media: Express.Multer.File[]
): Promise<any> => {
  const urls = await Promise.all(media.map((m) => uploadFromBuffer(m)));
  return urls;
};

export const createPost = async (
  caption: string,
  userId: number,
  mediaUrls: any
): Promise<{ post: Post; postMedia: PostMedia[] }> => {
  const result = await db.transaction(async (trx) => {
    const post = (
      await trx<Post>('post').insert({ user_id: userId, caption }, '*')
    )[0];

    const postMedia = await trx<PostMedia>('post_media').insert(
      mediaUrls.map((mu: any) => ({
        post_id: post.id,
        media_type: mu.resource_type,
        public_id: mu.public_id,
        media_url: mu.secure_url,
      })),
      '*'
    );

    return { post, postMedia };
  });
  return result;
};

// : Promise<{
//   posts: Post[];
//   users: User[];
//   postMedia: PostMedia[];
//   comments: PostComment[];
// }>
export const readPosts = async () => {
  const result = db.transaction(async (trx) => {
    const posts = await trx<Post>('post')
      .select(
        'post.*',
        trx.raw('count(comment.id)::integer as num_of_comments'),
        trx.raw('case when l.count is null then 0 else l.count end as likes')
      )
      .leftJoin('comment', 'comment.post_id', 'post.id')
      .leftJoin(
        trx<PostLike>('post_like')
          .select('post_id', trx.raw('count(*)::integer'))
          .groupBy('post_id')
          .as('l'),
        'l.post_id',
        'post.id'
      )
      .groupBy('post.id', 'l.count');

    const uniqueUserIds = [...new Set((posts as Post[]).map((p) => p.user_id))];
    const postIds = posts.map((p) => p.id);

    const users = (
      await trx<User>('public.user').select().whereIn('id', uniqueUserIds)
    ).map(userSerializer);

    const postMedia = await trx<PostMedia>('post_media')
      .select()
      .whereIn('post_id', postIds);

    const comments = await trx('comment')
      .with(
        'cte',
        trx.raw(
          'select *, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY created_at DESC) as rn from comment'
        )
      )
      .select('*')
      .from('cte')
      .where('rn', '<', 3)
      .whereIn('post_id', postIds);

    return { posts, users, postMedia, comments };
  });

  return result;
};

export const likePost = async (
  post_id: number,
  user_id: number
): Promise<PostLike> => {
  try {
    const like = (
      await db<PostLike>('post_like').insert({ post_id, user_id }, '*')
    )[0];

    return like;
  } catch (err) {
    if (err.code === '23505') {
      throw new AppError(409, 'You have already liked the post.');
    } else {
      throw err;
    }
  }
};

export const unlikePost = async (
  post_id: number,
  user_id: number
): Promise<PostLike> => {
  const like = (
    await db<PostLike>('post_like')
      .del()
      .where({ post_id, user_id })
      .returning('*')
  )[0];

  if (!like) {
    throw new AppError(404, 'You have not liked the post.');
  }

  return like;
};
