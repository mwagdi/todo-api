import { SQLDataSource } from 'datasource-sql';

class MyDatabase extends SQLDataSource {
  getUsers() {
    return this.knex.select('*').from('user');
  }
  testQuery() {
    return this.knex.insert({ name: 'TEST' }, ['id']).into('test');
  }

  migrate() {
    return this.knex.migrate.latest();
  }

  unlock() {
    return this.knex.migrate.forceFreeMigrationsLock();
  }
}

export default MyDatabase;
