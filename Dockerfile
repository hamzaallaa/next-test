# --- Build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache openssl

# 1) Dependencies (without postinstall scripts)
COPY package.json ./
# COPY package-lock.json ./   # Uncomment if you have a package-lock.json
RUN npm ci --ignore-scripts || npm i --ignore-scripts

# 2) Copy source code and generate Prisma client
COPY . .
RUN npx prisma generate

# --- Build Arguments ---
ARG STRIPE_SECRET_KEY
ARG STRIPE_PRICE_ID
ARG STRIPE_WEBHOOK_SECRET
ARG DATABASE_URL
ARG NEXT_PUBLIC_APP_URL

# --- Environment Variables for Build ---
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV STRIPE_PRICE_ID=$STRIPE_PRICE_ID
ENV STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# ⚠️ Avoid connecting to DB during build
ENV SKIP_DB=true

# 3) Build Next.js app
RUN npm run build

# --- Runtime stage ---
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl

# Copy only what’s needed for runtime
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/src ./src

# Run migrations + start server
CMD ["sh", "-c", "npx prisma migrate deploy && node node_modules/next/dist/bin/next start -p 3000"]
