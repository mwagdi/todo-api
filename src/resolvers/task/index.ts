import { Task } from '../../generated/graphql';
import { Context } from '../../types';

export const owner = async (
  parent: Task,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getOwner(parent.user_id);

export const comments = async (
  parent: Task,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getCommentsByTaskId(parent.id);
