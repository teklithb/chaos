# Use the official Ruby image that matches your Ruby version
FROM ruby:3.0.2

# Set the working directory in the Docker container
WORKDIR /app

# Copy the Gemfile and Gemfile.lock from your project into the Docker container
COPY Gemfile Gemfile.lock ./

# Install the Ruby gems (including Rails)
RUN bundle install

# Copy the rest of your application's code into the Docker container
COPY . .

# Copy the entrypoint script into the container and make it executable
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# Use the entrypoint script to start the service
ENTRYPOINT ["entrypoint.sh"]
# Define the command to run your Rails server
CMD ["rails", "server", "-b", "0.0.0.0","-p", "3001"]
