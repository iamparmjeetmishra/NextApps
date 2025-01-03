import { createRouter } from "@/lib/create-app";

import * as handlers from "./auth.handler";
import * as routes from "./auth.routes";

const router = createRouter()
  .openapi(routes.me, handlers.me)
  .openapi(routes.login, handlers.login)
  .openapi(routes.logout, handlers.logout)
  .openapi(routes.register, handlers.register)
  .openapi(routes.callback, handlers.callback);

export default router;
