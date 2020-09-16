import { User } from '../services/auth';

export const userSerializer = (user: User): Omit<User, 'password'> => {
  const { password: _, ...rest } = user;
  return rest;
};
