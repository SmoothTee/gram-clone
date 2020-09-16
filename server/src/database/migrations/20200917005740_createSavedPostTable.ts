import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('saved_post', (table) => {
    table.primary(['user_id', 'post_id']);
    table
      .integer('user_id')
      .references('id')
      .inTable('user')
      .unsigned()
      .notNullable();
    table
      .integer('post_id')
      .references('id')
      .inTable('post')
      .unsigned()
      .notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('saved_post');
}
