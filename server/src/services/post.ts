import { db } from '../database';
import { AppError } from '../utils';
import { userSerializer } from '../utils/serializer';
import { uploadFromBuffer } from '../utils/uploadFromBuffer';
import { User, UserWithoutPassword } from './auth';
import { PostComment, CommentLike } from './comment';

export interface Post {
  id: number;
  user_id: number;
  caption: string;
  updated_at: string;
  created_at: string;
}

export interface PostMedia {
  id: number;
  public_id: number;
  media_type: string;
  media_url: string;
  updated_at: string;
  created_at: string;
}

export interface PostLike {
  post_id: number;
  user_id: number;
  updated_at: string;
  created_at: string;
}

interface SavedPost {
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

export const readPosts = async (
  session: Express.Session
): Promise<{
  posts: Post[];
  users: UserWithoutPassword[];
  postMedia: PostMedia[];
  comments: PostComment[];
}> => {
  const result = db.transaction(async (trx) => {
    let postQuery = trx<Post>('post')
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
      .groupBy('post.id', 'l.count')
      .orderBy('post.created_at', 'desc');

    if (session && session.userId) {
      postQuery = postQuery
        .leftJoin(
          trx<SavedPost>('saved_post')
            .select()
            .where('user_id', session.userId)
            .as('saved_post'),
          'saved_post.post_id',
          'post.id'
        )
        .groupBy('saved_post.user_id')
        .select(
          trx.raw(
            'case when saved_post.user_id is not null then true else false end as saved'
          )
        );

      postQuery = postQuery
        .leftJoin(
          trx<PostLike>('post_like')
            .select()
            .where('user_id', session.userId)
            .as('pl'),
          'pl.post_id',
          'post.id'
        )
        .select(
          trx.raw(
            'case when pl.user_id is not null then true else false end as liked'
          )
        )
        .groupBy('pl.user_id');
    }

    const posts = await postQuery;

    const postIds = posts.map((p) => p.id);

    let commentQuery = trx('comment')
      .with(
        'cte',
        trx.raw(
          'select *, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY created_at DESC) as rn from comment'
        )
      )
      .select('cte.*')
      .from('cte')
      .where('rn', '<', 3)
      .whereIn('post_id', postIds);

    if (session && session.userId) {
      commentQuery = commentQuery
        .leftJoin(
          trx<CommentLike>('comment_like')
            .select()
            .where('user_id', session.userId)
            .as('cl'),
          'cl.comment_id',
          'cte.id'
        )
        .select(
          trx.raw(
            'case when cl.user_id is not null then true else false end as liked'
          )
        );
    }

    const comments = await commentQuery;

    const userIds = (posts as Post[]).map((p) => p.user_id);
    const cUserIds = (comments as PostComment[]).map((c) => c.user_id);
    const uniqueUserIds = [...new Set(userIds.concat(cUserIds))];

    const users = (
      await trx<User>('public.user').select().whereIn('id', uniqueUserIds)
    ).map(userSerializer);

    const postMedia = await trx<PostMedia>('post_media')
      .select()
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

export const savePost = async (
  post_id: number,
  user_id: number
): Promise<SavedPost> => {
  try {
    const savedPost = (
      await db<SavedPost>('saved_post').insert(
        {
          post_id,
          user_id,
        },
        '*'
      )
    )[0];

    return savedPost;
  } catch (err) {
    if (err.code === '23505') {
      throw new AppError(409, 'You have already saved the post.');
    } else {
      throw err;
    }
  }
};

export const unsavePost = async (
  post_id: number,
  user_id: number
): Promise<SavedPost> => {
  const unsavedPost = (
    await db<SavedPost>('saved_post')
      .del()
      .where({ post_id, user_id })
      .returning('*')
  )[0];

  if (!unsavedPost) {
    throw new AppError(404, 'You have not saved the post.');
  }

  return unsavedPost;
};

export const readPost = async (
  post_id: number,
  session: Express.Session
): Promise<{
  post: Post;
  users: UserWithoutPassword[];
  postMedia: PostMedia[];
  comments: PostComment[];
}> => {
  const result = await db.transaction(async (trx) => {
    let postQuery = trx<Post>('post')
      .first(
        'post.*',
        trx.raw('count(comment.id)::integer as num_of_comments'),
        trx.raw('case when l.count is null then 0 else l.count end as likes')
      )
      .where('post.id', post_id)
      .leftJoin('comment', 'comment.post_id', 'post.id')
      .leftJoin(
        trx<PostLike>('post_like')
          .select('post_id', trx.raw('count(*)::integer'))
          .groupBy('post_id')
          .as('l'),
        'l.post_id',
        'post.id'
      )
      .groupBy('post.id', 'l.count', 'saved_post.user_id', 'pl.user_id');

    if (session && session.userId) {
      postQuery = postQuery
        .leftJoin(
          trx<SavedPost>('saved_post')
            .select()
            .where('user_id', session.userId)
            .as('saved_post'),
          'saved_post.post_id',
          'post.id'
        )
        .select(
          trx.raw(
            'case when saved_post.user_id is not null then true else false end as saved'
          )
        );

      postQuery = postQuery
        .leftJoin(
          trx<PostLike>('post_like')
            .select()
            .where('user_id', session.userId)
            .as('pl'),
          'pl.post_id',
          'post.id'
        )
        .select(
          trx.raw(
            'case when pl.user_id is not null then true else false end as liked'
          )
        );
    }

    const post = ((await postQuery) as unknown) as Post;

    let commentQuery = trx('comment')
      .select(
        'comment.*',
        trx.raw('case when l.count is null then 0 else l.count end as likes')
      )
      .where({ post_id: post.id, parent_id: null })
      .leftJoin(
        trx<CommentLike>('comment_like')
          .select('comment_id', trx.raw('count(*)::integer'))
          .groupBy('comment_id')
          .as('l'),
        'l.comment_id',
        'comment.id'
      );

    if (session && session.userId) {
      commentQuery = commentQuery
        .leftJoin(
          trx<CommentLike>('comment_like')
            .select()
            .where('user_id', session.userId)
            .as('cl'),
          'cl.comment_id',
          'comment.id'
        )
        .select(
          trx.raw(
            'case when cl.user_id is not null then true else false end as liked'
          )
        );
    }

    const comments = (await commentQuery) as PostComment[];

    const cUserIds = (comments as PostComment[]).map((c) => c.user_id);
    const uniqueUserIds = [...new Set(cUserIds.concat(post.user_id))];

    const users = (
      await trx<User>('public.user').select().whereIn('id', uniqueUserIds)
    ).map(userSerializer);

    const postMedia = await trx<PostMedia>('post_media')
      .select()
      .where('post_id', post.id);

    return { post, users, postMedia, comments };
  });

  return result;
};

export const readSavedPosts = async (userId: number) => {
  const results = await db.transaction(async (trx) => {
    const savedPosts = await trx<SavedPost>('saved_post')
      .select()
      .where({ user_id: userId });

    const postIds = savedPosts.map((sp) => sp.post_id);

    const posts = await trx<Post>('post')
      .select(
        'post.*',
        trx.raw(
          'CASE WHEN c.num_of_comments IS NULL THEN 0 ELSE c.num_of_comments END'
        ),
        trx.raw('CASE WHEN l.likes IS NULL THEN 0 ELSE l.likes END')
      )
      .whereIn('post.id', postIds)
      .leftJoin(
        trx<PostComment>('comment')
          .select('post_id', trx.raw('count(*)::integer as num_of_comments'))
          .groupBy('post_id')
          .as('c'),
        'c.post_id',
        'post.id'
      )
      .leftJoin(
        trx<PostLike>('post_like')
          .select('post_id', trx.raw('count(*)::integer as likes'))
          .groupBy('post_id')
          .as('l'),
        'l.post_id',
        'post.id'
      );

    const postMedia = await trx<PostMedia>('post_media')
      .with(
        'cte',
        trx.raw(
          'select *, ROW_NUMBER() OVER (PARTITION BY post_id ORDER BY created_at DESC) as rn from post_media'
        )
      )
      .select('cte.*')
      .from('cte')
      .where('rn', 1)
      .whereIn('post_id', postIds);

    return { savedPosts, posts, postMedia };
  });

  return results;
};
