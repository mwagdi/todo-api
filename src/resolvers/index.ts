import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { Resolvers } from '../generated/graphql';
import { Context } from '../types';
import { checkIfUserLoggedIn, checkUserLogin } from '../utils';
import * as Query from './query';

const resolvers: Resolvers = {
  Query,
  User: {
    tasks: async (parent, args, { db }: Context) =>
      await db.getTasks(parent.id),
  },
  Task: {
    owner: async (parent, args, { db }: Context) =>
      await db.getOwner(parent.user_id),
    comments: async (parent, args, { db }: Context) =>
      await db.getCommentsByTaskId(parent.id),
  },
  Comment: {
    by: async (parent, args, { db }: Context) =>
      await db.getOwner(parent.user_id),
    task: async (parent, args, { db }: Context) =>
      await db.getTaskById(parent.task_id),
  },
  Mutation: {
    signup: async (parent, { input }, { db }) => {
      const { password: plaintextPassword, ...userFields } = input;
      const password = await hash(plaintextPassword, 10);
      try {
        const [user] = await db.createUser({ ...userFields, password });

        const token = sign(
          { userId: user.id },
          process.env.APP_SECRET as string,
        );

        return {
          token,
          user,
        };
      } catch (error: unknown) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
    login: async (parent, { email, password }, { db }) => {
      try {
        const userWithPassword = await db.getUserByEmail(email);

        await checkUserLogin(userWithPassword, password);

        const { password: _ignore, ...user } = userWithPassword;
        const token = sign(
          { userId: user.id },
          process.env.APP_SECRET as string,
        );

        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
    addTask: async (parent, { task }, { db, userId }) => {
      try {
        checkIfUserLoggedIn(userId);

        const [newTask] = await db.createTask({
          ...task,
          user_id: userId,
        });

        return newTask;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
    editTask: async (parent, { id, task }, { db, userId }) => {
      try {
        checkIfUserLoggedIn(userId);

        const [{ user_id: _ignore, ...editedTask }] = await db.editTask(
          id,
          task,
        );

        return editedTask;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
    deleteTask: async (parent, { id }, { db, userId }) => {
      try {
        checkIfUserLoggedIn(userId);

        const [deleted] = await db.deleteTask(id);
        return deleted;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
    addComment: async (parent, { comment }, { db, userId }) => {
      try {
        checkIfUserLoggedIn(userId);

        const [newComment] = await db.createComment({
          content: comment.content,
          task_id: comment.task,
          user_id: userId,
        });

        return newComment;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
    editComment: async (parent, { id, comment }, { db, userId }) => {
      try {
        checkIfUserLoggedIn(userId);

        const [{ user_id: _ignore, ...editedComment }] = await db.editComment(
          id,
          comment,
        );

        return editedComment;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
    deleteComment: async (parent, { id }, { db, userId }) => {
      try {
        checkIfUserLoggedIn(userId);

        const [deleted] = await db.deleteComment(id);
        return deleted;
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : 'Unknown error',
        );
      }
    },
  },
};

export default resolvers;
