import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import crypto from 'crypto';
import Redis from 'ioredis';

import { db } from '../database';
import { AppError, DuplicationError } from '../utils/appError';
import { userSerializer } from '../utils/serializer';
import { config } from '../config';
import { sendEmail } from '../utils/sendEmail';
import { FORGOT_PASSWORD_PREFIX } from '../constants';
import { Follower } from './follower';

const redis = new Redis();

export interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export type UserWithoutPassword = Omit<User, 'password'>;

export const register = async (
  data: Omit<User, 'id' | 'created_at' | 'updated_at'> & {
    confirmPassword: string;
  }
): Promise<UserWithoutPassword> => {
  const hashedPassword = await bcrypt.hash(data.password, 12);

  const { confirmPassword: _, ...rest } = data;

  try {
    const user = (
      await db<User>('user').insert({ ...rest, password: hashedPassword }, '*')
    )[0];
    return userSerializer(user);
  } catch (err) {
    // Violates unique constraints.
    if (err.code === '23505') {
      if (err.detail.includes('username')) {
        const userWithEmail = await db<User>('user')
          .first()
          .where({ email: data.email });
        if (userWithEmail) {
          throw new DuplicationError({
            username: 'Username is already taken',
            email: 'Email is already taken',
          });
        } else {
          throw new DuplicationError({
            username: 'Username is already taken',
          });
        }
      } else {
        throw new DuplicationError({
          email: 'Email is already taken',
        });
      }
    } else {
      throw err;
    }
  }
};

interface LoginData {
  usernameOrEmail: string;
  password: string;
}

export const login = async (
  data: LoginData
): Promise<{ user: UserWithoutPassword; followers: Follower[] }> => {
  const { usernameOrEmail, password } = data;
  const user = await db<User>('user')
    .first()
    .where({ username: usernameOrEmail })
    .orWhere({ email: usernameOrEmail });
  if (!user) {
    throw new AppError(404, 'User not found', {
      usernameOrEmail: 'Username or Email not found',
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError(422, 'Invalid Password', {
      password: 'Password is invalid',
    });
  }

  const followers = await db<Follower>('follower')
    .select()
    .where('follower_id', user.id);

  return { user: userSerializer(user), followers };
};

export const me = async (userId: number): Promise<UserWithoutPassword> => {
  const user = await db('user').first().where({ id: userId });
  if (!user) {
    throw new AppError(404, 'Invalid session.');
  }

  return userSerializer(user);
};

export const githubLogin = async (
  code: string
): Promise<UserWithoutPassword> => {
  const url = 'https://github.com/login/oauth/access_token';

  const { githubClientId, githubClientSecret } = config;

  const tokenResponse = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      code,
      client_id: githubClientId,
      client_secret: githubClientSecret,
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const { access_token } = await tokenResponse.json();

  const userResponse = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  const user = await userResponse.json();

  const userWithGithubId = await db<User>('public.user')
    .first()
    .where('github_id', user.id);

  if (userWithGithubId) {
    return userSerializer(userWithGithubId);
  }

  const emailsResponse = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `token ${access_token}`,
    },
  });

  const emails = (await emailsResponse.json()).filter((e: any) => e.primary);

  // Create new user with github info.
  const data = {
    github_id: user.id,
    full_name: user.name,
    username: user.login,
    email: emails[0].email,
  };

  const newUser = (await db<User>('public.user').insert(data, '*'))[0];

  return userSerializer(newUser);
};

export const forgotPassword = async (email: string): Promise<string> => {
  const user = await db<User>('public.user').first().where('email', email);

  if (!user) {
    throw new AppError(404, 'User not found.');
  }

  const token = crypto.randomBytes(20).toString('hex');

  await redis.set(
    FORGOT_PASSWORD_PREFIX + token,
    user.id,
    'ex',
    config.forgotPasswordDuration
  );

  sendEmail(
    user.email,
    `<a href='http://localhost:3000/reset-password/${token}' target='_blank'>Reset Password</a>`
  );

  return token;
};

export const resetPassword = async (
  newPassword: string,
  token: string
): Promise<UserWithoutPassword> => {
  const redisKey = FORGOT_PASSWORD_PREFIX + token;
  const userId = await redis.get(redisKey);

  if (!userId) {
    throw new AppError(401, 'Invalid token');
  }

  const user = await db<User>('public.user').first().where('id', userId);

  if (!user) {
    throw new AppError(404, 'User not found');
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.hashSalt)
  );

  const updatedUser = (
    await db<User>('public.user')
      .update({ password: hashedPassword }, '*')
      .where('id', userId)
  )[0];

  await redis.del(redisKey);

  return userSerializer(updatedUser);
};
