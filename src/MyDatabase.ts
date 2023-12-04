import { SQLDataSource } from 'datasource-sql';

class MyDatabase extends SQLDataSource {
  getUsers() {
    return this.knex.select('*').from('user');
  }
  testQuery() {
    return this.knex.insert({ some: 'data' }, ['id']).into('test');
  }
}

export default MyDatabase;
