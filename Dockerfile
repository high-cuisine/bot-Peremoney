FROM node:20-alpine AS builder

# Устанавливаем зависимости для сборки
RUN apk add --no-cache openssl python3 make g++

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --force
COPY . .

# Явно указываем команду сборки
RUN npm run build
RUN npx prisma generate

# Проверяем наличие собранных файлов
RUN ls -la dist/

FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Проверяем структуру в финальном образе
RUN ls -la dist/

EXP