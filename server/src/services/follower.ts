import { db } from '../database';
import { userSerializer } from '../utils/serializer';
import { User, UserWithoutPassword } from './auth';

export interface Follower {
  user_id: number;
  follower_id: number;
  created_at: string;
  updated_at: string;
}

export const suggestions = async (
  userId: number
): Promise<UserWithoutPassword[]> => {
  const users = await db<User>('public.user')
    .select('public.user.*')
    .leftJoin(
      db<Follower>('follower').select().where('follower_id', userId).as('f'),
      'f.user_id',
      'public.user.id'
    )
    .whereNot('public.user.id', userId)
    .whereNull('f.follower_id')
    .orderBy('created_at', 'desc');

  return users.map(userSerializer);
};

export const follow = async (
  user_id: number,
  follower_id: number
): Promise<Follower> => {
  const follower = (
    await db<Follower>('follower').insert(
      {
        user_id,
        follower_id,
      },
      '*'
    )
  )[0];

  return follower;
};

export const unfollow = async (
  user_id: number,
  follower_id: number
): Promise<Follower> => {
  const follower = (
    await db<Follower>('follower')
      .del()
      .where({ user_id, follower_id })
      .returning('*')
  )[0];

  return follower;
};

export const readFollowers = async (
  user_id: number
): Promise<{ followers: Follower[]; users: UserWithoutPassword[] }> => {
  const followers = await db<Follower>('follower').select().where({ user_id });

  const followerIds = followers.map((f) => f.follower_id);

  const users = await db<User>('public.user')
    .select()
    .whereIn('id', followerIds);

  return { followers, users: users.map(userSerializer) };
};

export const readFollowings = async (
  follower_id: number
): Promise<{ followings: Follower[]; users: UserWithoutPassword[] }> => {
  const followings = await db<Follower>('follower')
    .select()
    .where({ follower_id });

  const followingIds = followings.map((f) => f.user_id);

  const users = await db<User>('public.user')
    .select()
    .whereIn('id', followingIds);

  return { followings, users: users.map(userSerializer) };
};
