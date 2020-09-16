import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('follower', (table) => {
    table.primary(['user_id', 'follower_id']);
    table
      .integer('user_id')
      .references('id')
      .inTable('user')
      .unsigned()
      .notNullable();
    table
      .integer('follower_id')
      .references('id')
      .inTable('user')
      .unsigned()
      .notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('follower');
}
