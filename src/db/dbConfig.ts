import { config } from 'dotenv';

import MyDatabase from './MyDatabase';

config();

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

export default new MyDatabase(knexConfig);
