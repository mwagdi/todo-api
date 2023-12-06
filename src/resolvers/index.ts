import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { Resolvers } from '../generated/graphql';
import { Context } from '../types';
import { checkIfUserLoggedIn, checkUserLogin } from '../utils';

const resolvers: Resolvers = {
  // Task: {
  //     comments: (parent, args, { prisma }) => {
  //         return prisma.task.findUnique({ where: { id: parent.id } }).comments();
  //     },
  //     owners: (parent, args, { prisma }) => {
  //         return prisma.task.findUnique({ where: { id: parent.id } }).owners();
  //     },
  //     createdBy: (parent, args, { prisma }) => {
  //         return prisma.task.findUnique({ where: { id: parent.id } }).createdBy();
  //     },
  // },
  // Mutation: {
  //     deleteUser: async (parent, { id }, { prisma }) => {
  //         try {
  //             return await prisma.user.delete({
  //                 where: {
  //                     id,
  //                 },
  //             });
  //         } catch (error) {
  //             throw new Error(error.message);
  //         }
  //     },
  //     deleteComment: async (parent, { id }, { prisma, userId }) => {
  //         try {
  //             checkIfUserLoggedIn(userId);
  //
  //             return await prisma.comment.delete({
  //                 where: {
  //                     id,
  //                 },
  //             });
  //         } catch (error) {
  //             throw new Error(error.message);
  //         }
  //     },
  // },
  Query: {
    users: async (parent, args, { db }: Context) => await db.getUsers(),
  },
  User: {
    tasks: async (parent, args, { db }: Context) =>
      await db.getTasks(parent.id),
  },
  Task: {
    owner: async (parent, args, { db, userId }: Context) =>
      await db.getOwner(userId as number),
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

        const [{ user_id: _ignore, ...newTask }] = await db.createTask({
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
  },
};

export default resolvers;
