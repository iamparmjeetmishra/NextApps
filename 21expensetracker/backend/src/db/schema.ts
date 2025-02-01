import { date, index, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title")
      .notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 })
      .notNull(),
    date: date("date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => new Date())
      .$onUpdate(() => new Date()),
  },
  expenses => [
    index("name_idx").on(expenses.userId),
  ],
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
    title: z.string().min(2, { message: "items must be 2 characters long or more" }).max(200, { message: "items cannot be this much big" }),
    amount: z.number().min(1, { message: "item must be above zero." }),
  },
).required({
  amount: true,
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const patchExpensesSchema = insertExpensesSchema.partial();

export const createExpenseSchema = insertExpensesSchema;

export type CreateExpenseType = z.infer<typeof createExpenseSchema>;

// Insert - can be used to validate API Requests
// Select - can be used to validate API Responses
