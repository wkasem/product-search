import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'product_search',
  },
  pool: {
    min: 2,
    max: 10,
  },
});

export default db;