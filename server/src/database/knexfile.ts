// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'joeyliew',
      database: 'gram',
      charset: 'utf8',
    },
    migrations: {
      directory: __dirname + '/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: __dirname + '/migrations',
      extension: 'ts',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
