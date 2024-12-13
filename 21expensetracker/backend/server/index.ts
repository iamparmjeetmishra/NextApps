import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { authRoute } from "./routes/auth";
// import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono()

app.use("*", logger())

app.get('/health', (c) => {
  return c.json({"message": "Health ok"})
})

const apiRoutes = app.basePath("/api")
  .route("/expenses", expensesRoute)
  .route("/", authRoute)


// app.route("/api/expenses", expensesRoute)
// app.use('*', serveStatic({root: '/frontend/dist'}))
// app.use('*', serveStatic({path: '/frontend/dist/index.html'}))

export default app;
export type ApiRoutes = typeof apiRoutes