import { oc } from "@orpc/contract";
import z from "zod";

export const base = oc.errors({
  UNAUTHORIZED: {
    status: 401,
    message: "Authentication required",
  },
  FORBIDDEN: {
    status: 403,
    message:
      "You do not have permission to perform this action",
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found",
    data: z.object({
      resourceType: z.string(),
      resourceId: z.string(),
    }),
  },
  CONFLICT: {
    status: 409,
    message: "Resource conflict",
    data: z.object({
      field: z.string(),
      value: z.string(),
    }),
  },
  DOMAIN_RULE_VIOLATION: {
    status: 422,
    message: "Business rule violation",
    data: z.object({
      rule: z.string(),
    }),
  },
});
