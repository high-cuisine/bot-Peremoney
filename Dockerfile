# Используем Node.js 20 (LTS)
FROM node:20-alpine AS builder

# Устанавливаем зависимости для сборки (включая Python)
RUN apk add --no-cache openssl python3 make g++

# Создаем рабочую директорию
WORKDIR /app

# Копируем все файлы проекта
COPY . .

# Устанавливаем зависимости с игнорированием peer-зависимостей
RUN npm install --legacy-peer-deps --force

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем приложение
RUN npm run build

# Проверяем содержимое dist директории
RUN ls -la dist/

# Финальный образ
FROM node:20-alpine

# Устанавливаем зависимости для Prisma
RUN apk add --no-cache openssl

# Создаем рабочую директорию
WORKDIR /app

# Копируем только необходимое из builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Проверяем содержимое dist директории
RUN ls -la dist/

# Экспонируем порт
EXPOSE 3000

# Запускаем миграции и приложение
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]