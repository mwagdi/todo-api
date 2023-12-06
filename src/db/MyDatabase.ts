import { SQLDataSource } from 'datasource-sql';

import { SignupInput, TaskInput, User } from '../generated/graphql';

class MyDatabase extends SQLDataSource {
  getUsers() {
    return this.knex
      .select('id', 'email', 'first_name', 'last_name', 'username')
      .from('users');
  }

  getTasks(userId: number) {
    return this.knex.select('*').from('tasks').where('user_id', userId);
  }

  getTaskById(id: number) {
    return this.knex.select('*').from('tasks').where('id', id).first();
  }

  createUser(input: SignupInput): Promise<User[]> {
    return this.knex('users')
      .returning(['id', 'first_name', 'last_name', 'email', 'username'])
      .insert(input);
  }

  createTask(task: TaskInput & { user_id: number }) {
    return this.knex('tasks').returning('*').insert(task);
  }

  getUserByEmail(email: string) {
    return this.knex.select('*').from('users').where('email', email).first();
  }

  getOwner(id: number) {
    return this.knex.select('*').from('users').where('id', id).first();
  }

  migrate() {
    return this.knex.migrate.latest();
  }

  unlock() {
    return this.knex.migrate.forceFreeMigrationsLock();
  }
}

export default MyDatabase;
