import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import {
  MutationAddCommentArgs,
  MutationAddTaskArgs,
  MutationDeleteCommentArgs,
  MutationDeleteTaskArgs,
  MutationEditCommentArgs,
  MutationEditTaskArgs,
  MutationLoginArgs,
  MutationSignupArgs,
} from '../../generated/graphql';
import { Context } from '../../types';
import { checkIfUserLoggedIn, checkUserLogin } from '../../utils';

export const signup = async (
  parent: NonNullable<unknown>,
  { input }: MutationSignupArgs,
  { db }: Context,
) => {
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
export const login = async (
  parent: NonNullable<unknown>,
  { email, password }: MutationLoginArgs,
  { db }: Context,
) => {
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
export const addTask = async (
  parent: NonNullable<unknown>,
  { task }: MutationAddTaskArgs,
  { db, userId }: Context,
) => {
  try {
    checkIfUserLoggedIn(userId);

    const [newTask] = await db.createTask({
      ...task,
      user_id: userId as number,
    });

    return newTask;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const editTask = async (
  parent: NonNullable<unknown>,
  { id, task }: MutationEditTaskArgs,
  { db, userId }: Context,
) => {
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
export const deleteTask = async (
  parent: NonNullable<unknown>,
  { id }: MutationDeleteTaskArgs,
  { db, userId }: Context,
) => {
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
export const addComment = async (
  parent: NonNullable<unknown>,
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

    return newComment;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Unknown error');
  }
};
export const editComment = async (
  parent: NonNullable<unknown>,
  { id, comment }: MutationEditCommentArgs,
  { db, userId }: Context,
) => {
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
export const deleteComment = async (
  parent: NonNullable<unknown>,
  { id }: MutationDeleteCommentArgs,
  { db, userId }: Context,
) => {
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
