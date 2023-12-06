import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { Resolvers } from '../generated/graphql';
import { Context } from '../types';

const resolvers: Resolvers = {
  // Query: {
  //     users: (parent, args, { prisma }) => {
  //         return prisma.user.findMany({
  //             include: { tasks: true },
  //         });
  //     },
  //     tasks: (parent, args, { prisma }) => {
  //         return prisma.task.findMany({
  //             include: { owners: true },
  //         });
  //     },
  // },
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
  // Comment: {
  //     task: (parent, args, { prisma }) => {
  //         return prisma.comment.findUnique({ where: { id: parent.id } }).task();
  //     },
  //     by: (parent, args, { prisma }) => {
  //         return prisma.comment.findUnique({ where: { id: parent.id } }).by();
  //     },
  // },
  // Mutation: {
  //     signup: async (parent, { input }, { prisma }) => {
  //         const { password: plaintextPassword, ...userFields } = input;
  //         const password = await hash(plaintextPassword, 10);
  //         try {
  //             const user = await prisma.user.create({
  //                 data: {
  //                     ...userFields,
  //                     password,
  //                 },
  //             });
  //
  //             const token = sign({ userId: user.id }, process.env.APP_SECRET);
  //
  //             return {
  //                 token,
  //                 user,
  //             };
  //         } catch (error) {
  //             throw new Error(error.message);
  //         }
  //     },
  //     login: async (parent, { email, password }, { prisma }) => {
  //         try {
  //             const user = await prisma.user.findUnique({
  //                 where: { email },
  //             });
  //
  //             await checkUserLogin(user, password);
  //             const token = sign({ userId: user.id }, process.env.APP_SECRET);
  //
  //             return {
  //                 token,
  //                 user,
  //             };
  //         } catch (error) {
  //             throw new Error(error.message);
  //         }
  //     },
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
  //     addTask: async (parent, { task }, { prisma, userId }) => {
  //         try {
  //             checkIfUserLoggedIn(userId);
  //
  //             return await prisma.task.create({
  //                 data: {
  //                     ...task,
  //                     owners: {
  //                         connect: [{ id: userId }],
  //                     },
  //                     createdBy: {
  //                         connect: { id: userId },
  //                     },
  //                 },
  //             });
  //         } catch (error) {
  //             throw new Error(error.message);
  //         }
  //     },
  //     addComment: async (parent, { comment }, { prisma, userId }) => {
  //         try {
  //             checkIfUserLoggedIn(userId);
  //
  //             return await prisma.comment.create({
  //                 data: {
  //                     ...comment,
  //                     by: {
  //                         connect: { id: userId },
  //                     },
  //                     task: {
  //                         connect: { id: comment.task },
  //                     },
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
    tasks: async (parent, args, { db }: Context) => await db.getTasks(parent.id),
  },
  Mutation: {
    signup: async (parent, { input }, { db }) => {
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
    },
  },
};

export default resolvers;
