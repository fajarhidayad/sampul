import { relations } from 'drizzle-orm';
import {
  bigint,
  date,
  decimal,
  mysqlEnum,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: bigint('id', { mode: 'number' })
    .primaryKey()
    .autoincrement()
    .notNull()
    .unique(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 64 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).$onUpdate(() =>
    new Date().toDateString()
  ),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  categories: many(categoriesTable),
}));

export const categoriesTable = mysqlTable('categories', {
  id: bigint('id', { mode: 'number' })
    .primaryKey()
    .autoincrement()
    .notNull()
    .unique(),
  name: varchar('name', { length: 255 }).notNull(),
  type: mysqlEnum('type', ['income', 'expense']).notNull(),
  userId: bigint('user_id', { mode: 'number' })
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).$onUpdate(() =>
    new Date().toDateString()
  ),
});

export const categoriesRelations = relations(categoriesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [categoriesTable.userId],
    references: [usersTable.id],
  }),
}));

export const transactionsTable = mysqlTable('transactions', {
  id: bigint('id', { mode: 'number' })
    .primaryKey()
    .autoincrement()
    .notNull()
    .unique(),
  userId: bigint('user_id', { mode: 'number' })
    .references(() => usersTable.id, { onDelete: 'cascade' })
    .notNull(),
  categoryId: bigint('category_id', { mode: 'number' })
    .references(() => categoriesTable.id, { onDelete: 'cascade' })
    .notNull(),
  amount: decimal('amount').notNull(),
  date: date('date', { mode: 'date' }).notNull(),
  description: varchar('description', { length: 255 }),
  createdAt: timestamp('created_at', { mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'string' }).$onUpdate(() =>
    new Date().toDateString()
  ),
});

export const transactionsRelations = relations(
  transactionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [transactionsTable.userId],
      references: [usersTable.id],
    }),
    category: one(categoriesTable, {
      fields: [transactionsTable.categoryId],
      references: [categoriesTable.id],
    }),
  })
);
