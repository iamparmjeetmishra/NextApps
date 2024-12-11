import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";



const app = new Hono()

app.use("*", logger())

app.get('/health', (c) => {
  return c.json({"message": "Health ok"})
})

app.route("/api/expenses", expensesRoute)

app.use('*', serveStatic({root: '/frontend/dist'}))
app.use('*', serveStatic({path: '/frontend/dist/index.html'}))

export default app;