import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertExpensesSchema, patchExpensesSchema, selectExpensesSchema, totalSpentSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Expenses"];

export const list = createRoute({
  path: "/expenses",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectExpensesSchema),
      "The List of expenses",
    ),
    // [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
    //   createMessageObjectSchema("Internal Server Error"),
    //   "INTERNAL_SERVER_ERROR",
    // ),
  },
});

export const totalSpent = createRoute({
  path: "/expenses/total",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(totalSpentSchema),
      "The List of all total expenses",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "expenses not found",
    ),
    [HttpStatusCodes.NO_CONTENT]: {
      description: "The expenses has been deleted",
    },
  },
});

export const create = createRoute({
  path: "/expenses",
  tags,
  method: "post",
  request: {
    body: jsonContentRequired(insertExpensesSchema, "The expenses to create"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectExpensesSchema,
      "The created expenses",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertExpensesSchema),
      "The validation error",
    ),
  },
});

export const getOne = createRoute({
  path: "/expenses/{id}",
  tags,
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectExpensesSchema,
      "The Requested expenses",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "expenses not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertExpensesSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/expenses/{id}",
  tags,
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchExpensesSchema,
      "The expenses to update",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectExpensesSchema,
      "The Updated expenses",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "expenses not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchExpensesSchema)
        .or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/expenses/{id}",
  tags,
  request: {
    params: IdParamsSchema,
  },
  method: "delete",
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "The expenses has been deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "expenses not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type GetOneRoute = typeof getOne;
export type PatchRoute = typeof patch;
export type TotalSpentRoute = typeof totalSpent;
export type RemoveRoute = typeof remove;
