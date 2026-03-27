import dotenv from "dotenv";
import { createEnv } from "@t3-oss/env-core";
import { fileURLToPath } from "node:url";
import { z } from "zod";

function getRuntimeEnv() {
  const globalEnv = (globalThis as { __env__?: Record<string, string | undefined> }).__env__;
  return globalEnv ?? process.env;
}

function getEnvFileNames(envName: string | undefined) {
  if (!envName) return [];

  const aliases = {
    development: ["development", "dev"],
    production: ["production", "prod"],
    test: ["test"],
  } as const;

  const normalizedEnvName = envName.toLowerCase();
  const candidates = aliases[normalizedEnvName as keyof typeof aliases] ?? [normalizedEnvName];
  return [...new Set(candidates)];
}

// Cloudflare workerd does not expose file-based module URLs, so only resolve dotenv
// files when this module is running from the filesystem in a Node-like environment.
const moduleUrl = typeof import.meta.url === "string" ? import.meta.url : undefined;

if (moduleUrl?.startsWith("file:")) {
  const workspaceRoot = fileURLToPath(new URL("../../../", moduleUrl));
  const appEnvDir = fileURLToPath(new URL("../../../apps/web/", moduleUrl));
  const envNames = [
    ...getEnvFileNames(process.env.CLOUDFLARE_ENV),
    ...getEnvFileNames(process.env.NODE_ENV),
  ];
  const candidateEnvFiles = [
    ...envNames.flatMap((envName) => [
      `${appEnvDir}.env.${envName}.local`,
      `${appEnvDir}.env.${envName}`,
      `${workspaceRoot}.env.${envName}.local`,
      `${workspaceRoot}.env.${envName}`,
    ]),
    `${appEnvDir}.env.local`,
    `${appEnvDir}.env`,
    `${workspaceRoot}.env.local`,
    `${workspaceRoot}.env`,
  ];

  for (const path of new Set(candidateEnvFiles)) {
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
  runtimeEnv: getRuntimeEnv(),
  emptyStringAsUndefined: true,
});
