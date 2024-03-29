#!/bin/bash
set -e

# Wait for Elasticsearch to be up (optional, if your app requires it)
# until curl -s http://elasticsearch:9200; do
#   echo 'Waiting for Elasticsearch...'
#   sleep 1
# done

# Check if the database exists. If not, create it
echo "Creating database if it doesn't exist..."
bundle exec rake db:create

# Run database migrations
echo "Running database migrations..."
bundle exec rake db:migrate

# Remove a potentially pre-existing server.pid for Rails.
rm -f tmp/pids/server.pid

# Start the main application.
exec "$@"
