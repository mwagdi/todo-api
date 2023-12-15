import { Maybe, Resolver, ResolversTypes } from '../../generated/graphql';
import { Context } from '../../types';

export const users = async (
  parent: NonNullable<unknown>,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getUsers();

export const tasks: Resolver<
  Maybe<Array<Maybe<ResolversTypes['Task']>>>,
  NonNullable<unknown>,
  Context
> = async (parent, args, { db, userId }) => {
  try {
    if (userId) return await db.getTasks(userId);
    throw new Error('User not logged in');
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
