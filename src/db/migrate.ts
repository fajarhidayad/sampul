import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
import env from '../env';
import config from '../../drizzle.config.js';
import { createClient } from '@libsql/client';

const client = createClient({
  url: env.DB_URL,
  authToken: env.DB_AUTH_TOKEN,
});
const db = drizzle(client);

if (!env.DB_MIGRATE) {
  throw new Error('DB_MIGRATE must set to true');
}

try {
  await migrate(db, { migrationsFolder: config.out! });
  client.close();
  console.log('Successfully migrate');
} catch (error) {
  console.error(error);
}
