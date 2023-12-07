import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import {
  Comment,
  Maybe,
  MutationAddCommentArgs,
  MutationAddTaskArgs,
  MutationDeleteCommentArgs,
  MutationDeleteTaskArgs,
  MutationEditCommentArgs,
  MutationEditTaskArgs,
  MutationLoginArgs,
  MutationSignupArgs,
  RequireFields,
  Resolver,
  ResolversTypes,
  Task,
} from '../../generated/graphql';
import { Context } from '../../types';
import { checkIfUserLoggedIn, checkUserLogin } from '../../utils';

export const signup: Resolver<
  Maybe<ResolversTypes['AuthPayload']>,
  NonNullable<unknown>,
  Context,
  RequireFields<MutationSignupArgs, 'input'>
> = async (parent, { input }, { db }) => {
  const { password: plaintextPassword, ...userFields } = input;
  const password = await hash(plaintextPassword, 10);
  try {
    const [user] = await db.createUser({ ...userFields, password });

    const token = sign({ userId: user.id }, process.env.APP_SECRET as string);

    return {
      token,
      user,
    };
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const login: Resolver<
  Maybe<ResolversTypes['AuthPayload']>,
  NonNullable<unknown>,
  Context,
  RequireFields<MutationLoginArgs, 'email' | 'password'>
> = async (parent, { email, password }, { db }) => {
  try {
    const userWithPassword = await db.getUserByEmail(email);

    await checkUserLogin(userWithPassword, password);

    const { password: _ignore, ...user } = userWithPassword;
    const token = sign({ userId: user.id }, process.env.APP_SECRET as string);

    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const addTask: Resolver<
  ResolversTypes['Task'],
  NonNullable<unknown>,
  Context,
  RequireFields<MutationAddTaskArgs, 'task'>
> = async (parent, { task }: MutationAddTaskArgs, { db, userId }: Context) => {
  try {
    checkIfUserLoggedIn(userId);

    const [newTask] = await db.createTask({
      ...task,
      user_id: userId as number,
    });

    return newTask as unknown as Task;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const editTask: Resolver<
  ResolversTypes['Task'],
  NonNullable<unknown>,
  Context,
  RequireFields<MutationEditTaskArgs, 'id' | 'task'>
> = async (parent, { id, task }, { db, userId }) => {
  try {
    checkIfUserLoggedIn(userId);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [{ user_id: _ignore, ...editedTask }] = await db.editTask(id, task);

    return editedTask;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const deleteTask: Resolver<
  ResolversTypes['Task'],
  NonNullable<unknown>,
  Context,
  RequireFields<MutationDeleteTaskArgs, 'id'>
> = async (parent, { id }, { db, userId }) => {
  try {
    checkIfUserLoggedIn(userId);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [deleted] = await db.deleteTask(id);
    return deleted;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const addComment: Resolver<
  ResolversTypes['Comment'],
  NonNullable<unknown>,
  Context,
  RequireFields<MutationAddCommentArgs, 'comment'>
> = async (
  parent,
  { comment }: MutationAddCommentArgs,
  { db, userId }: Context,
) => {
  try {
    checkIfUserLoggedIn(userId);

    const [newComment] = await db.createComment({
      content: comment.content,
      task_id: comment.task,
      user_id: userId as number,
    });

    return newComment as unknown as Comment;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const editComment: Resolver<
  ResolversTypes['Comment'],
  NonNullable<unknown>,
  Context,
  RequireFields<MutationEditCommentArgs, 'comment' | 'id'>
> = async (parent, { id, comment }, { db, userId }) => {
  try {
    checkIfUserLoggedIn(userId);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [{ user_id: _ignore, ...editedComment }] = await db.editComment(
      id,
      comment,
    );

    return editedComment;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const deleteComment: Resolver<
  ResolversTypes['Comment'],
  NonNullable<unknown>,
  Context,
  RequireFields<MutationDeleteCommentArgs, 'id'>
> = async (parent, { id }, { db, userId }) => {
  try {
    checkIfUserLoggedIn(userId);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const [deleted] = await db.deleteComment(id);
    return deleted;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
