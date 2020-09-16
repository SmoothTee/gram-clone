import bcrypt from 'bcrypt';

import { db } from '../database';
import { AppError, DuplicationError } from '../utils/appError';
import { userSerializer } from '../utils/serializer';

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
        const userWithEmail = await db<User>('users')
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

export const login = async (
  data: Pick<User, 'username' | 'password'>
): Promise<UserWithoutPassword> => {
  const { username, password } = data;
  const user = await db('user').first().where({ username });
  if (!user) {
    throw new AppError(404, 'User not found', {
      username: 'Username not found',
    });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError(422, 'Invalid Password', {
      password: 'Password is invalid',
    });
  }

  return userSerializer(user);
};

export const me = async (userId: number): Promise<UserWithoutPassword> => {
  const user = await db('user').first().where({ id: userId });
  if (!user) {
    throw new AppError(404, 'Invalid session.');
  }

  return userSerializer(user);
};
