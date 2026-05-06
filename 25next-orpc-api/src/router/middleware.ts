import { contract } from "@/contract";
import { implement } from "@orpc/server";

export interface User {
  id: string;
}

export interface BaseContext {
  headers: Headers;
}

export interface AuthedContex extends BaseContext {
  user: User;
}

export interface OptionalAuthContext extends BaseContext {
  user: User | null;
}

function parseToken(
  authorization: string | null,
): User | null {
  if (!authorization) return null;
  const token = authorization.split(" ")[1];
  if (!token) return null;
  return { id: token };
}

const os = implement(contract);

export const authMiddleware = os
  .$context<BaseContext>()
  .middleware(async ({ context, next, errors }) => {
    const user = parseToken(
      context.headers.get("authorization"),
    );
    if (!user) {
      throw errors.UNAUTHORIZED();
    }
    return next({ context: { user } });
  });

export const optionalAuthMiddleware = os
  .$context<BaseContext>()
  .middleware(async ({ context, next }) => {
    const user = parseToken(
      context.headers.get("authorization"),
    );
    return next({ context: { user } });
  });
