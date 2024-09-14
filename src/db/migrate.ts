import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection } from 'mysql2';
import env from '../env';
import config from '../../drizzle.config.js';

const connection = createConnection({
  host: env.DB_HOST,
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
});
const db = drizzle(connection);

try {
  await migrate(db, { migrationsFolder: config.out! });
  await connection.end();
  console.log('Successfully migrate');
} catch (error) {
  console.error(error);
}
