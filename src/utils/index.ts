import { compare } from 'bcryptjs';
import { verify } from 'jsonwebtoken';

export interface AuthTokenPayload {
  userId: number;
}

export const decodeAuthHeader = (authHeader: string) => {
  const [_, token] = authHeader.split(' ');

  if (!token) {
    throw new Error('No token found');
  }

  return verify(token, process.env.APP_SECRET as string);
};

export const checkIfUserLoggedIn = (userId: number) => {
  if (!userId) throw new Error('Cannot create task without logging in.');
};

export const checkUserLogin = async (
  userPassword: string,
  password: string,
) => {
  const errorMessage = 'Email or Password is incorrect';

  if (!userPassword) throw new Error(errorMessage);

  const valid = await compare(password, userPassword);
  if (!valid) throw new Error(errorMessage);
};
