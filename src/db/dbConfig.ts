import MyDatabase from './MyDatabase';

const knexConfig = {
  client: 'pg',
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
// you can also pass a knex instance instead of a configuration object
export default new MyDatabase(knexConfig);
