/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id');
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('users.id');
    table.string('status').notNullable().defaultTo('todo');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {};
