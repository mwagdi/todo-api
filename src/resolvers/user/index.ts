import { User } from '../../generated/graphql';
import { Context } from '../../types';

export const tasks = async (
  parent: User,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getTasks(parent.id);
