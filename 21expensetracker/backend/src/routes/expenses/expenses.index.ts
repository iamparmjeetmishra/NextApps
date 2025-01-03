import { createRouter } from "@/lib/create-app";

import * as handlers from "./expenses.handler";
import * as routes from "./expenses.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.totalSpent, handlers.totalSpent)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default router;
