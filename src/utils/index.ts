import { compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

import { User } from '../generated/graphql';

export interface AuthTokenPayload {
  userId: number;
}

export const decodeAuthHeader = (authHeader: string) => {
  const [_ignore, token] = authHeader.split(' ');

  if (!token) {
    throw new Error('No token found');
  }

  return verify(token, process.env.APP_SECRET as string) as AuthTokenPayload;
};

export const checkIfUserLoggedIn = (userId?: number) => {
  if (!userId) throw new Error('Cannot create task without logging in.');
};

export const checkUserLogin = async (
  user: Omit<User, 'tasks'> & { password: string },
  password: string,
) => {
  const errorMessage = 'Email or Password is incorrect';

  if (!user) throw new Error(errorMessage);

  const valid = await compare(password, user.password);
  if (!valid) throw new Error(errorMessage);
};
