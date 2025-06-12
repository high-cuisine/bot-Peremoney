# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install Python and build tools
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install Python, build tools, netcat and postgresql-client
RUN apk add --no-cache python3 make g++ netcat-openbsd postgresql-client

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install production dependencies only
RUN npm ci --only=production --ignore-scripts

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy wait-for-db script
COPY wait-for-db.sh ./
RUN chmod +x wait-for-db.sh

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["./wait-for-db.sh", "npm", "run", "start:migrate:prod"] 