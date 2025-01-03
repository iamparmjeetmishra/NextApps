import * as HttpstatusCodes from "stoker/http-status-codes";
import * as HttpstatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import createKinde from "@/lib/kinde";

import type { CallbackRoute, LoginRoute, LogoutRoute, MeRoute, RegisterRoute } from "./auth.routes";

export const me: AppRouteHandler<MeRoute> = async (c) => {
  const { kindeClient, sessionManager } = createKinde(c.env);
  const manager = sessionManager(c);
  const isAuthenticated = await kindeClient.isAuthenticated(manager);

  if (!isAuthenticated) {
    return c.json({ error: HttpstatusPhrases.UNAUTHORIZED }, HttpstatusCodes.UNAUTHORIZED);
  }

  const user = await kindeClient.getUser(manager);
  return c.json({ user }, HttpstatusCodes.OK);
};

export const login: AppRouteHandler<LoginRoute> = async (c) => {
  const { kindeClient, sessionManager } = createKinde(c.env);
  const registerUrl = await kindeClient.register(sessionManager(c));
  return c.redirect(registerUrl.toString());
};

export const register: AppRouteHandler<RegisterRoute> = async (c) => {
  const { kindeClient, sessionManager } = createKinde(c.env);
  const registerUrl = await kindeClient.register(sessionManager(c));
  if (!registerUrl) {
    return c.json({ error: HttpstatusPhrases.UNPROCESSABLE_ENTITY }, HttpstatusCodes.UNPROCESSABLE_ENTITY);
  }
  return c.redirect(registerUrl.toString());
};

export const callback: AppRouteHandler<CallbackRoute> = async (c) => {
  const { kindeClient, sessionManager } = createKinde(c.env);
  const url = new URL(c.req.url);
  await kindeClient.handleRedirectToApp(sessionManager(c), url);
  return c.redirect("/");
};

export const logout: AppRouteHandler<LogoutRoute> = async (c) => {
  const { kindeClient, sessionManager } = createKinde(c.env);
  const logoutUrl = await kindeClient.logout(sessionManager(c));
  return c.redirect(logoutUrl.toString());
};