# ---------- BUILD ----------
FROM node:18-alpine
WORKDIR /app

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .

ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

RUN pnpm run build


# ---------- RUN ----------
FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=0 /app/.next ./.next
COPY --from=0 /app/public ./public
COPY --from=0 /app/package.json ./package.json
COPY --from=0 /app/node_modules ./node_modules

EXPOSE 3000
CMD ["pnpm", "start"]
