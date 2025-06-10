FROM node:20-alpine AS builder

RUN apk add --no-cache openssl python3 make g++

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps --force
COPY . .
RUN npm run build
RUN npx prisma generate

FROM node:20-alpine
RUN apk add --no-cache openssl
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Добавляем healthcheck для мониторинга состояния
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').request('http://localhost:3000', {method: 'GET'}, (r) => {process.exit(r.statusCode === 200 ? 0 : 1)}).end()"

EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]