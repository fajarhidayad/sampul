import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull().unique(),
  name: text('name', { length: 255 }).notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
  userId: integer('user_id', { mode: 'number' })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const categoriesRelations = relations(categories, ({ one }) => ({
  user: one(users, {
    fields: [categories.userId],
    references: [users.id],
  }),
}));
