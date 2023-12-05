import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import db from './db/dbConfig';
import resolvers from './resolvers';
import schema from './schema.graphql';
import { Context } from './types';

const typeDefs = schema.loc?.source.body as string;

// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   database: 'todo_app',
//   user: 'mahmoudelawadi',
//   password: 'mahmoudelawadi',
// });

// client.connect().then(() => console.log('Connected to database'));

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({ db }),
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
