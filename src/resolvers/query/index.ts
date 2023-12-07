import { Context } from '../../types';

export const users = async (
  parent: NonNullable<unknown>,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getUsers();
