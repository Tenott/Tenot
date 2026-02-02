FROM node:20-slim AS deps
WORKDIR /app
COPY package*.json ./

# Устанавливаем OpenSSL для Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

RUN npm install

FROM node:20-slim AS builder
WORKDIR /app

# Устанавливаем OpenSSL для Prisma
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Генерируем Prisma клиент и собираем приложение
RUN npx prisma generate
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# Устанавливаем OpenSSL для Prisma runtime
RUN apt-get update && apt-get install -y openssl wget && rm -rf /var/lib/apt/lists/*

# Копируем собранное приложение и зависимости
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

EXPOSE 3001

# Запускаем NestJS приложение
CMD ["node", "dist/main.js"]
