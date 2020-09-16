import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('comment', (table) => {
    table.increments();
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
    table.integer('parent_id').references('id').inTable('comment').unsigned();
    table.string('text').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('comment');
}
