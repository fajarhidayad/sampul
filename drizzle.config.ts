import { defineConfig } from 'drizzle-kit';
import env from './src/env';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'turso',
  schema: './src/db/schema/*.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: env.DB_URL,
    authToken: env.DB_AUTH_TOKEN,
  },
});
