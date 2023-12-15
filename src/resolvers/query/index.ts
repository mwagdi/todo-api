import { Context } from '../../types';

export const users = async (
  parent: NonNullable<unknown>,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getUsers();

export const tasks = async (
  parent: NonNullable<unknown>,
  args: NonNullable<unknown>,
  { db, userId }: Context,
) => {
  try {
    if (userId) return await db.getTasks(userId);
    return Error('User not logged in');
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
