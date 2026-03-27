import dotenv from "dotenv";
import { createEnv } from "@t3-oss/env-core";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Cloudflare workerd does not expose file-based module URLs, so only resolve dotenv
// files when this module is running from the filesystem in a Node-like environment.
const moduleUrl = typeof import.meta.url === "string" ? import.meta.url : undefined;

if (moduleUrl?.startsWith("file:")) {
  const workspaceRoot = fileURLToPath(new URL("../../../", moduleUrl));
  const appEnvDir = fileURLToPath(new URL("../../../apps/web/", moduleUrl));
  const candidateEnvFiles = [
    `${appEnvDir}.env.local`,
    `${appEnvDir}.env`,
    `${workspaceRoot}.env.local`,
    `${workspaceRoot}.env`,
  ];

  for (const path of candidateEnvFiles) {
    dotenv.config({ path, override: false, quiet: true });
  }
}

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.url(),
    CORS_ORIGIN: z.url(),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
