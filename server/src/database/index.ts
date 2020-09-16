// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require('./knexfile');

import knex from 'knex';

import { config } from '../config';

export const db = knex(knexConfig[config.env]);
