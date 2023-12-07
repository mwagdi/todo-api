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
  Mutation,
};

export default resolvers;
