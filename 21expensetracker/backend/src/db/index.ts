import type { NeonDatabase } from "drizzle-orm/neon-serverless";

import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

import type { Environment } from "@/env";

import * as schema from "@/db/schema";

export function createDb(env: Environment) {
  const pool = new Pool({ connectionString: env.DATABASE_URL });

  const db: NeonDatabase<typeof schema> = drizzle(pool, { schema });

  return db;
}
