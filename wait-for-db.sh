#!/bin/sh

# Wait a bit for the network to be ready
sleep 5

# Wait for database
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "db" -U "postgres" -d "peremoney" -c '\q' 2>/dev/null; do
  echo "Waiting for database connection..."
  sleep 2
done

# Wait for Redis
until nc -z redis 6379 2>/dev/null; do
  echo "Waiting for Redis connection..."
  sleep 2
done

echo "Database and Redis are up, running prisma db push"
npx prisma db push

# Execute the command passed to the script
exec "$@"