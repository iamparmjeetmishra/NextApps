import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { notFoundSchema } from "@/lib/constants";
import { getUser } from "@/lib/kinde";

const UserSchema = z.object({
  email: z.string().email(),
});

const LoginRequestSchema = z.object({
  username: z.string(),
});

const RegisterRequestSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

const TokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const tags = ["Auth"];

export const me = createRoute({
  path: "/auth/me",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(UserSchema),
      "Authenticated user",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: jsonContent(
      z.array(UserSchema),
      "Unauthorized user",
    ),
  },
  handler: [getUser],
});

export const login = createRoute({
  path: "/auth/login",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(LoginRequestSchema),
      "Access and refresh tokens",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: {
      description: "Invalid credentials",
    },
  },
});

export const register = createRoute({
  path: "/auth/register",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      RegisterRequestSchema,
      "User Register successfully",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(RegisterRequestSchema),
      "The validation error",
    ),
  },
});

export const callback = createRoute({
  path: "/auth/callback",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      TokenSchema,
      "Token Reaceived successfully",
    ),
    [HttpStatusCodes.UNAUTHORIZED]: {
      description: "Invalid tokens",
    },
  },
});

export const logout = createRoute({
  path: "/auth/logout",
  tags,
  method: "get",
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "User logged out successfully",
    },
    [HttpStatusCodes.UNAUTHORIZED]: {
      description: "User not authenticated",
    },
  },
});

export type MeRoute = typeof me;
export type LoginRoute = typeof login;
export type RegisterRoute = typeof register;
export type CallbackRoute = typeof callback;
export type LogoutRoute = typeof logout;
