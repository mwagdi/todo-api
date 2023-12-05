// postgresql://mahmoudelawadi:mahmoudelawadi@localhost:5432/todo_app

import MyDatabase from './MyDatabase';

const knexConfig = {
  client: 'pg',
  connection: {
    database: 'todo_app',
    host: 'localhost',
    user: 'mahmoudelawadi',
    password: 'mahmoudelawadi',
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
// you can also pass a knex instance instead of a configuration object
export default new MyDatabase(knexConfig);
