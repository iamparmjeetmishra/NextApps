import { defineConfig } from "drizzle-kit";

import env from "@/env/server";

export default defineConfig({
  out: "./src/db/migration",
  schema: "./src/db/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});