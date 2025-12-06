#!/bin/sh

echo "Waiting for database..."
./wait-for-it.sh $DB_HOST:$DB_PORT --timeout=60 --strict -- echo "Database is up"

echo "Running migrations..."
npx knex migrate:latest

echo "Running seeders..."
knex seed:run

echo "Starting application..."
exec "$@"
