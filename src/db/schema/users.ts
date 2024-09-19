import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { categories } from './categories';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull().unique(),
  firstName: text('first_name', { length: 100 }).notNull(),
  lastName: text('last_name', { length: 100 }).notNull(),
  email: text('email', { length: 256 }).unique().notNull(),
  password: text('password', { length: 255 }).notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  categories: many(categories),
}));
