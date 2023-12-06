import { SQLDataSource } from 'datasource-sql';

import { SignupInput, User } from '../generated/graphql';

class MyDatabase extends SQLDataSource {
  getUsers() {
    return this.knex.select('id', 'email', 'first_name', 'last_name', 'username').from('users');
  }

  getTasks(userId: number) {
    return this.knex.select('*').from('tasks').where('user_id', userId);
  }

  createUser(input: SignupInput): Promise<User[]> {
    return this.knex('users').returning(['id', 'first_name', 'last_name', 'email', 'username']).insert(input);
  }

  migrate() {
    return this.knex.migrate.latest();
  }

  unlock() {
    return this.knex.migrate.forceFreeMigrationsLock();
  }
}

export default MyDatabase;
