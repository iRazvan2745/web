# syntax=docker/dockerfile:1

FROM oven/bun:1.3.5-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock turbo.json tsconfig.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/api/package.json packages/api/package.json
COPY packages/auth/package.json packages/auth/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/env/package.json packages/env/package.json
COPY packages/stripe/package.json packages/stripe/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

FROM deps AS build
COPY apps/web apps/web
COPY packages packages
RUN bun run --cwd apps/web build

FROM base AS runtime
ENV NODE_ENV=production
ENV PORT=3001

COPY package.json bun.lock turbo.json tsconfig.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages/api/package.json packages/api/package.json
COPY packages/auth/package.json packages/auth/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/env/package.json packages/env/package.json
COPY packages/stripe/package.json packages/stripe/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --production --frozen-lockfile

COPY --from=build /app/apps/web/dist apps/web/dist

EXPOSE 3001

CMD ["bun", "--eval", "const { default: app } = await import('./apps/web/dist/server/server.js'); Bun.serve({ hostname: '0.0.0.0', port: Number(process.env.PORT || 3001), fetch: app.fetch }); await new Promise(() => {});"]
