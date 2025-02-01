import { and, desc, eq, sum } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import { createDb } from "@/db";
import { expenses as expenseTable, insertExpensesSchema } from "@/db/schema";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute, TotalSpentRoute } from "./expenses.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const db = createDb(c.env);
  const user = c.var.user;
  // const expenses = await db.query.expenses.findMany();
  const expenses = await db
    .select()
    .from(expenseTable)
    .where(eq(expenseTable.userId, user.id))
    .orderBy(desc(expenseTable.createdAt))
    .limit(100);
  // console.log("Expenses", expenses);
  return c.json({ expenses }, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const db = createDb(c.env);
  const user = await c.var.user;
  // console.log("user", user);

  const expense = c.req.valid("json");
  // console.log("expense", expense);
  const validatedExpense = insertExpensesSchema.parse({
    ...expense,
    userId: user.id,
  });
  // console.log("ValidatedExpense", validatedExpense);

  const expenses = await db
    .insert(expenseTable)
    .values(validatedExpense)
    .returning()
    .then(res => res[0]);

  return c.json(expenses, HttpStatusCodes.OK);
};

export const totalSpent: AppRouteHandler<TotalSpentRoute> = async (c) => {
  const db = await createDb(c.env);
  const user = c.var.user;
  // Calculate total expenses directly in the database
  // const result = await db.select({ value: sum(expenseTable.amount) }).from(expenseTable);
  const result = await db
    .select({ value: sum(expenseTable.amount) })
    .from(expenseTable)
    .where(eq(expenseTable.userId, user.id))
    .limit(1)
    .then(res => res[0]);
  // console.log("Result", result);

  return c.json(result || 0, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const db = createDb(c.env);
  const id = Number.parseInt(c.req.param("id"));
  const user = c.var.user;

  const expenses = await db
    .select()
    .from(expenseTable)
    .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
    .orderBy(desc(expenseTable.createdAt))
    .then(res => res[0]);

  if (!expenses) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(expenses, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const db = createDb(c.env);
  const id = Number.parseInt(c.req.param("id"));
  const user = c.var.user;
  const updates = c.req.valid("json");

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY,
    );
  }

  const expense = await db
    .update(expenseTable)
    .set(updates)
    .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
    .returning()
    .then(res => res[0]);

  if (!expense) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(expense, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const db = createDb(c.env);
  const id = Number.parseInt(c.req.param("id"));
  const user = c.var.user;

  const result = await db
    .delete(expenseTable)
    .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
    .returning()
    .then(res => res[0]);

  if (!result) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.json(result, HttpStatusCodes.OK);
};
