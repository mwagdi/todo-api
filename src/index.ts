import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import db from './db/dbConfig';
import resolvers from './resolvers';
import schema from './schema.graphql';
import { Context } from './types';
import { decodeAuthHeader } from './utils';

const typeDefs = schema.loc?.source.body as string;

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: (process.env.PORT as unknown as number) || 4000 },
    context: async ({ req }) => {
      const token =
        req && req.headers.authorization
          ? decodeAuthHeader(req.headers.authorization)
          : null;

      return {
        db,
        userId: token?.userId,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
