import { Resolvers } from '../generated/graphql';
import * as Comment from './comment';
import * as Mutation from './mutation';
import * as Query from './query';
import * as Task from './task';
import * as User from './user';

const resolvers: Resolvers = {
  Query,
  User,
  Task,
  Comment,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  Mutation,
};

export default resolvers;
