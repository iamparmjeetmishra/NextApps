import { eq, sum } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import { createDb } from "@/db";
import { expenses as expenseTable } from "@/db/schema";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute, TotalSpentRoute } from "./expenses.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { db } = createDb(c.env);
  const user = c.var.user;
  // const expenses = await db.query.expenses.findMany();
  const expenses = await db
    .select()
    .from(expenseTable)
    .where(eq(expenseTable.userId, user.id));
  // console.log("Expenses", expenses);
  return c.json(expenses);
};

export const totalSpent: AppRouteHandler<TotalSpentRoute> = async (c) => {
  const { db } = await createDb(c.env);

  // Calculate total expenses directly in the database
  const result = await db.select({ value: sum(expenseTable.amount) }).from(expenseTable);
  // console.log("Result", result);

  return c.json(result || 0, HttpStatusCodes.OK); // Ensure a fallback of 0 if no expenses exist
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { db } = createDb(c.env);
  const expense = c.req.valid("json");
  const [inserted] = await db.insert(expenseTable).values(expense).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { db } = createDb(c.env);
  const { id } = c.req.valid("param");
  const expenses = await db.query.expenses.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

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
  const { db } = createDb(c.env);
  const { id } = c.req.valid("param");
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

  const [expense] = await db.update(expenseTable)
    .set(updates)
    .where(eq(expenseTable.id, id))
    .returning();

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
  const { db } = createDb(c.env);
  const { id } = c.req.valid("param");
  const result = await db.delete(expenseTable)
    .where(eq(expenseTable.id, id));

  if (result.rowsAffected === 0) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};
