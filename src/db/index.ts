import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2';
import env from '../env';

const connection = createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  database: env.DB_NAME,
});

export const db = drizzle(connection, { logger: true });
