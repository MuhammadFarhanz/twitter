ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} AS base

WORKDIR /app

RUN apk add --no-cache libc6-compat

# ========================================
# 1. Dependencies Stage 
# ========================================
FROM base AS dependencies

# Copy lockfiles and configuration files first to leverage build caching
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/usr/local/share/.cache/yarn \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
  if [ -f package-lock.json ]; then \
    npm ci --no-audit --no-fund; \
  elif [ -f yarn.lock ]; then \
    corepack enable yarn && yarn install --frozen-lockfile --production=false; \
  elif [ -f pnpm-lock.yaml ]; then \
    corepack enable pnpm && pnpm install --frozen-lockfile; \
  else \
    echo "No lockfile found." && exit 1; \
  fi

# ========================================
# 2. Development Stage 
# ========================================
FROM dependencies AS development
ENV NODE_ENV=development \
    NEXT_TELEMETRY_DISABLED=1

# Copy source files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# ========================================
# 3. Build Stage
# ========================================
FROM dependencies AS builder

# Set working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV NODE_ENV=production

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ========================================
# 4. Production Runner Stage (Inherits from Base)
# ========================================
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME="0.0.0.0"\
    NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

# Leverage Next.js standalone features for a tiny final footprint
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static


USER node
EXPOSE 3000

CMD ["node", "server.js"]