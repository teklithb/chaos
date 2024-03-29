#!/bin/bash
set -e

# # Wait for MySQL to be ready
 echo "Waiting for MySQL..."
 while ! mysqladmin ping -h"$DB_HOST" --silent; do
    sleep 1
 done
# Check if the database exists. If not, create it
#echo "Creating database if it doesn't exist..."
#php artisan db:create || true

# Run database migrations
echo "Running database migrations..."
php artisan migrate --force

# Remove a potentially pre-existing server.pid for Rails.
# For Laravel, ensure the storage/logs directory is writable.
echo "Ensuring storage directories are writable..."
chmod -R 777 storage bootstrap/cache


# # Install NPM dependencies and build assets.
# echo "Installing NPM dependencies..."
# npm install

# Install NPM dependencies
#echo "Installing NPM dependencies..."
#cd /var/www || exit
#npm install

# Start Vite in the background for development
#echo "Starting Vite..."
#npm run dev &
# echo "Building assets with Vite..."
# npm run build

# Start the main application.
echo "Starting Laravel application..."
exec php-fpm
