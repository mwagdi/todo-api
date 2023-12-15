import db from './dbConfig';

db.migrate()
  .then(() => {
    console.log('Migrations ran successfully');
    process.exit();
  })
  .catch((err) => {
    console.log('Error running migrations', err);
  });
