FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# ── Dependencies ──────────────────────────────
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# ── Builder ───────────────────────────────────
FROM base AS builder
ENV NODE_OPTIONS="--dns-result-order=ipv4first"
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ── Runner (production image) ─────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# VPS không có IPv6 ổn định — cần cho fetch uit.edu.vn lúc runtime (import News)
ENV NODE_OPTIONS="--dns-result-order=ipv4first"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# data/posts.json (News) — mount volume vào đây để giữ dữ liệu giữa các lần deploy
RUN mkdir -p /app/data && chown nextjs:nodejs /app/data

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]