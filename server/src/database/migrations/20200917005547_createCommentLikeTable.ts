import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comment', (table) => {
    table.primary(['user_id', 'comment']);
    table
      .integer('user_id')
      .references('id')
      .inTable('user')
      .unsigned()
      .notNullable();
    table
      .integer('comment_id')
      .references('id')
      .inTable('comment')
      .unsigned()
      .notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('comment_like');
}
