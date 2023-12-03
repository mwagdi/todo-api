import { ApolloServer } from '@apollo/server';
import schema from './schema.graphql';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = schema.loc?.source.body as string;

const resolvers = {
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
    users: () => [
      {
        id: 1,
        firstName: 'Mahmoud',
        lastName: 'Elawadi',
        email: 'mahmoudwagdi86@gmail.com',
        username: 'mwagdi',
        tasks: [],
      },
    ],
    tasks: () => [
      {
        id: 1,
        title: 'Task',
        description: 'Description',
        owners: [
          {
            id: 1,
            firstName: 'Mahmoud',
            lastName: 'Elawadi',
            email: 'mahmoudwagdi86@gmail.com',
            username: 'mwagdi',
            tasks: [],
          },
        ],
        comments: [],
        createdBy: {
          id: 1,
          firstName: 'Mahmoud',
          lastName: 'Elawadi',
          email: 'mahmoudwagdi86@gmail.com',
          username: 'mwagdi',
          tasks: [],
        },
      },
    ],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
