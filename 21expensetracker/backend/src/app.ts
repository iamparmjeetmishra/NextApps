import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import auth from "@/routes/auth/auth.index";
import expenses from "@/routes/expenses/expenses.index";
import index from "@/routes/index.route";

const app = createApp().basePath("/api");

const routes = [
  index,
  expenses,
  auth,
] as const;

configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;
