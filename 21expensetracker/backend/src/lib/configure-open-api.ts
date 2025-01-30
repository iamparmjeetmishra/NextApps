import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Expenses API",
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "deepSpace",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "node",
        clientKey: "fetch",
      },
      spec: {
        url: "/api/doc",
      },
    }),
  );
}
