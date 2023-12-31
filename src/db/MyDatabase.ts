import { SQLDataSource } from 'datasource-sql';

import {
  CommentEditInput,
  SignupInput,
  TaskEditInput,
  TaskInput,
  User,
} from '../generated/graphql';

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

  editTask(id: number, task: TaskEditInput) {
    return this.knex('tasks').returning('*').where('id', id).update(task);
  }

  deleteTask(id: number) {
    return this.knex('tasks').returning('*').where('id', id).del();
  }

  createComment(comment: {
    content: string;
    task_id: number;
    user_id: number;
  }) {
    return this.knex('comments').returning('*').insert(comment);
  }

  editComment(id: number, comment: CommentEditInput) {
    return this.knex('comments').returning('*').where('id', id).update(comment);
  }

  deleteComment(id: number) {
    return this.knex('comments').returning('*').where('id', id).del();
  }

  getCommentsByTaskId(taskId: number) {
    return this.knex.select('*').from('comments').where('task_id', taskId);
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
