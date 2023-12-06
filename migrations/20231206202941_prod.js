/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable().unique();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
  });
  knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');
    table.string('status').notNullable().defaultTo('todo');
    table.timestamps(true, true);
  });
  knex.schema.createTable('comments', (table) => {
    table.increments('id');
    table.string('content').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');
    table.integer('task_id').unsigned().notNullable();
    table.foreign('task_id').references('tasks.id');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
