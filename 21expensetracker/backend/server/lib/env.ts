
import { z } from "zod";


const EnvSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
  BE_URL: z.string().url(),
  DATABASE_URL: z.string().url(),
  DATABASE_AUTH_TOKEN: z.string().optional(),
  KINDE_CLIENT_ID: z.string(),
  KINDE_CLIENT_SECRET: z.string(),
  KINDE_ISSUER_URL: z.string().url(),
  KINDE_SITE_URL: z.string().url(),
  KINDE_POST_LOGOUT_REDIRECT_URL: z.string().url(),
  KINDE_POST_LOGIN_REDIRECT_URL: z.string().url(),
}).superRefine((input, ctx) => {
  if (input.NODE_ENV === "production" && !input.DATABASE_AUTH_TOKEN) {
    ctx.addIssue({
      code: z.ZodIssueCode.invalid_type,
      expected: "string",
      received: "undefined",
      path: ["DATABASE_AUTH_TOKEN"],
      message: "DATABASE_AUTH_TOKEN is required in production",
    });
  }
});

export type Env = z.infer<typeof EnvSchema>;

// const { data: env, error } = EnvSchema.safeParse(process.env);

// Singleton for validated environment variables
export const getEnv = (bindings: Record<string, unknown>): Env => {
  const { data, error } = EnvSchema.safeParse(bindings);
  if (error) {
    console.error("Environment variable validation failed!");
    console.error(
      error.errors
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join("\n"),
    );
    throw new Error("Invalid environment configuration");
  }
  return data;
};