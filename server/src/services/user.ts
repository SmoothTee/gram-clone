import { db } from '../database';
import { AppError } from '../utils';
import { userSerializer } from '../utils/serializer';
import { User, UserWithoutPassword } from './auth';
import { PostComment } from './comment';
import { Post, PostLike, PostMedia } from './post';

export const readProfile = async (
  username: string
): Promise<{ user: UserWithoutPassword }> => {
  const result = await db.transaction(async (trx) => {
    const user = await trx<User>('public.user')
      .first(
        'public.user.*',
        'p.num_of_posts',
        trx.raw(
          'CASE WHEN f.num_of_followers IS NULL THEN 0 ELSE f.num_of_followers END'
        ),
        trx.raw(
          'CASE WHEN fing.num_of_followings IS NULL THEN 0 ELSE fing.num_of_followings END'
        )
      )
      .where('username', username)
      .leftJoin(
        trx('post')
          .select('user_id', trx.raw('count(*)::integer as num_of_posts'))
          .groupBy('user_id')
          .as('p'),
        'p.user_id',
        'public.user.id'
      )
      .leftJoin(
        trx('follower')
          .select('user_id', trx.raw('count(*)::integer as num_of_followers'))
          .groupBy('user_id')
          .as('f'),
        'f.user_id',
        'public.user.id'
      )
      .leftJoin(
        trx('follower')
          .select(
            'follower_id',
            trx.raw('count(*)::integer as num_of_followings')
          )
          .groupBy('follower_id')
          .as('fing'),
        'fing.follower_id',
        'public.user.id'
      );

    if (!user) {
      throw new AppError(404, 'User not found.');
    }

    const posts = await trx<Post>('post')
      .select(
        'post.*',
        trx.raw(
          'CASE WHEN c.num_of_comments IS NULL THEN 0 ELSE c.num_of_comments END'
        ),
        trx.raw('CASE WHEN l.likes IS NULL THEN 0 ELSE l.likes END')
      )
      .where('user_id', user.id)
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

    const uniquePostIds = posts.map((p) => p.id);

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
      .whereIn('post_id', uniquePostIds);

    return { user: userSerializer(user), posts, postMedia };
  });

  return result;
};
