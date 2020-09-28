import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', (table) => {
    table.increments();
    table.integer('github_id').unsigned();
    table.string('full_name').notNullable();
    table.string('username').unique().notNullable();
    table.string('email').unique().notNullable();
    table.string('password');
    table.string('avatar_url');
    table.string('website');
    table.string('bio', 150);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user');
}
