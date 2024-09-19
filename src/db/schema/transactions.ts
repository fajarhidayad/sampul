import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { users } from './users';
import { categories } from './categories';
import { relations, sql } from 'drizzle-orm';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull().unique(),
  userId: integer('user_id', { mode: 'number' })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  categoryId: integer('category_id', { mode: 'number' })
    .references(() => categories.id, { onDelete: 'cascade' })
    .notNull(),
  amount: real('amount').notNull(),
  type: text('type', { enum: ['income', 'expense'] }).notNull(),
  date: text('date').notNull(),
  description: text('description', { length: 255 }),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
