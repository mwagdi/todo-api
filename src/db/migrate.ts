import { config } from 'dotenv';

import db from './dbConfig';

config();

console.log({ process: process.env });

db.migrate()
  .then(() => {
    console.log('Migrations ran successfully');
  })
  .catch((err) => {
    console.log('Error running migrations', err);
  });
