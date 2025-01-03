import type { SessionManager } from "@kinde-oss/kinde-typescript-sdk";
import type { Context } from "hono";

import { createKindeServerClient, GrantType } from "@kinde-oss/kinde-typescript-sdk";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

import type { Environment } from "@/env";

export default function createKinde(env: Environment) {
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
