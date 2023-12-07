import { Comment } from '../../generated/graphql';
import { Context } from '../../types';

export const by = async (
  parent: Comment,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getOwner(parent.user_id);
export const task = async (
  parent: Comment,
  args: NonNullable<unknown>,
  { db }: Context,
) => await db.getTaskById(parent.task_id);
