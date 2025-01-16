import type { SessionManager, UserType } from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";

import { createKindeServerClient, GrantType } from "@kinde-oss/kinde-typescript-sdk";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import * as HttpstatusCodes from "stoker/http-status-codes";
import * as HttpstatusPhrases from "stoker/http-status-phrases";

import type { Environment as Env } from "@/env";

import type { AppBindings } from "./types";

export default function createKinde(env: Env) {
  const kindeClient = createKindeServerClient(GrantType.AUTHORIZATION_CODE, {
    authDomain: env.KINDE_ISSUER_URL,
    clientId: env.KINDE_CLIENT_ID,
    clientSecret: env.KINDE_CLIENT_SECRET,
    redirectURL: env.KINDE_POST_LOGIN_REDIRECT_URL,
    logoutRedirectURL: env.KINDE_POST_LOGOUT_REDIRECT_URL,
  });

  // Session manager using cookies for session handling
  const sessionManager = (c: Context): SessionManager => ({
    async getSessionItem(key: string) {
      return getCookie(c, key) || null;
    },
    async setSessionItem(key: string, value: unknown) {
      const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      } as const;
      if (typeof value === "string") {
        setCookie(c, key, value, cookieOptions);
      }
      else {
        setCookie(c, key, JSON.stringify(value), cookieOptions);
      }
    },
    async removeSessionItem(key: string) {
      deleteCookie(c, key);
    },
    async destroySession() {
      ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
        deleteCookie(c, key);
      });
    },
  });

  return { kindeClient, sessionManager };
}

export const getUser = createMiddleware<AppBindings>(async (c, next) => {
  try {
    const { kindeClient, sessionManager } = createKinde(c.env);
    const manager = sessionManager(c);
    const isAuthenticated = await kindeClient.isAuthenticated(manager);

    if (!isAuthenticated) {
      return c.json({ error: HttpstatusPhrases.UNAUTHORIZED }, HttpstatusCodes.UNAUTHORIZED);
    }
    const user = await kindeClient.getUser(manager);

    console.log("user", user);
    c.set("user", user);
    await next();
  }
  catch (error) {
    console.error(error);
    return c.json({ error: HttpstatusPhrases.INTERNAL_SERVER_ERROR }, HttpstatusCodes.INTERNAL_SERVER_ERROR);
  }
});
