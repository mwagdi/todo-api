import MyDatabase from './MyDatabase';

const knexConfig = {
  client: 'pg',
  connection: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};

export default new MyDatabase(knexConfig);
