import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const expenses = sqliteTable(
  "expenses",
  {
    id: integer("id", { mode: "number" })
      .primaryKey({ autoIncrement: true }),
    title: text("title")
      .notNull(),
    amount: integer("amount")
      .notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .$defaultFn(() => new Date()),
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
);

export const selectExpensesSchema = createSelectSchema(expenses);

export const totalSpentSchema = createSelectSchema(expenses).required(
  {
    id: true,
    title: true,
    amount: true,
  },
).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertExpensesSchema = createInsertSchema(
  expenses,
  {
    title: schema => schema.title.min(1).max(500),
  },
).required({
  amount: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchExpensesSchema = insertExpensesSchema.partial();
