import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertExpensesSchema, patchExpensesSchema, selectExpensesSchema, totalSpentSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Auth"];

export const me = createRoute({
  path: "/auth/me",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectExpensesSchema),
      "Authenticated user",
    ),
  },
});

export const login = createRoute({
  path: "/auth/login",
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

export const register = createRoute({
  path: "/auth/register",
  tags,
  method: "get",
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

export const callback = createRoute({
  path: "/auth/callback",
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

export const logout = createRoute({
  path: "/auth/logout",
  tags,
  method: "get",
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

export type MeRoute = typeof me;
export type LoginRoute = typeof login;
export type RegisterRoute = typeof register;
export type CallbackRoute = typeof callback;
export type LogoutRoute = typeof logout;
