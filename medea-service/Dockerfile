# # Use the official Node.js 16 image as a parent image
# FROM node:16-alpine

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy the current directory contents into the container at /usr/src/app
# COPY . .

# # Install any dependencies
# RUN npm install

# # Make port 80 available to the world outside this container
# EXPOSE 3002

# # Define the command to run your app using CMD which defines your runtime
# CMD ["node", "index.js"]


# Use the official Node.js image as a base
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install multer
RUN npm install multer

# Copy the rest of the application code
COPY . .

# Expose port 3002
EXPOSE 3002

# Command to run the application
CMD ["node", "index.js"]
