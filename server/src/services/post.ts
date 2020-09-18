import { db } from '../database';
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

export const readPosts = async () => {
  const result = db.transaction(async (trx) => {
    const posts = await trx<Post>('post')
      .select(
        'post.*',
        trx.raw('count(comment.id)::integer as num_of_comments')
      )
      .leftJoin('comment', 'comment.post_id', 'post.id')
      .groupBy('post.id');

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
