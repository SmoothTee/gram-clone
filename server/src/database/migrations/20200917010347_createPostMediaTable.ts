import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('post_media', (table) => {
    table.increments();
    table
      .integer('post_id')
      .references('id')
      .inTable('post')
      .unsigned()
      .notNullable();
    table.enum('media_type', ['video', 'image']).notNullable();
    table.string('public_id').notNullable();
    table.string('media_url').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('post_media');
}
