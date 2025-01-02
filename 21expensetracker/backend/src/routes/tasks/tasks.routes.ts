import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";

const tags = ["Tasks"];

export const list = createRoute({
  path: "/tasks",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      "The List of tasks",
    ),
  },
});

export const create = createRoute({
  path: "/tasks",
  tags,
  method: "post",
  request: {
    body: jsonContentRequired(insertTasksSchema, "The Task to create"),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "The created tasks",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "The validation error",
    ),
  },
});

export const getOne = createRoute({
  path: "/tasks/{id}",
  tags,
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "The Requested Task",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      "Invalid id error",
    ),
  },
});

export const patch = createRoute({
  path: "/tasks/{id}",
  tags,
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchTasksSchema,
      "The Task to update",
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      "The Updated tasks",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTasksSchema)
        .or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
  },
});

export const remove = createRoute({
  path: "/tasks/{id}",
  tags,
  request: {
    params: IdParamsSchema,
  },
  method: "delete",
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "The Task has been deleted",
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Task not found",
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
export type RemoveRoute = typeof remove;
