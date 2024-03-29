# # # Use PHP 8.1.2 FPM image from the Docker Hub
# # FROM php:8.1.2-fpm

# # # Set working directory
# # WORKDIR /var/www

# # # Install system dependencies for Laravel and PHP extensions needed
# # RUN apt-get update && apt-get install -y \
# #     build-essential \
# #     libpng-dev \
# #     libjpeg62-turbo-dev \
# #     libfreetype6-dev \
# #     locales \
# #     zip \
# #     jpegoptim optipng pngquant gifsicle \
# #     vim \
# #     unzip \
# #     git \
# #     curl \
# #     libonig-dev \
# #     libxml2-dev \
# #     libzip-dev  # Added this line for libzip



# # # Install PHP extensions
# # RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl


# # # Clear cache
# # RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# # # Install PHP extensions
# # RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
# # RUN docker-php-ext-configure gd --with-freetype --with-jpeg
# # RUN docker-php-ext-install gd

# # # Install Composer
# # COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# # # Add user for Laravel application
# # RUN groupadd -g 1000 www
# # RUN useradd -u 1000 -ms /bin/bash -g www www

# # # Copy existing application directory contents
# # COPY . /var/www

# # # Copy existing application directory permissions
# # COPY --chown=www:www . /var/www
# # # Create necessary Laravel directories
# # RUN mkdir -p /var/www/storage/logs /var/www/storage/framework/sessions /var/www/storage/framework/cache /var/www/storage/framework/views /var/www/bootstrap/cache

# # # Set directory permissions
# # RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache && \
# #     chmod -R 775 /var/www/storage /var/www/bootstrap/cache
# # # Change current user to www
# # USER www

# # # Expose port 9000 and start php-fpm server
# # EXPOSE 9000
# # CMD ["php-fpm"]

# Use PHP 8.1.2 FPM image from the Docker Hub
FROM php:8.1.2-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies for Laravel and PHP extensions needed
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    libzip-dev\
    default-mysql-client 
    #nodejs\
    #npm


# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create necessary Laravel directories
RUN mkdir -p storage/logs storage/framework/sessions storage/framework/cache storage/framework/views bootstrap/cache

# Copy existing application directory contents
COPY . .


# Change ownership and permissions
RUN chown -R www-data:www-data . && \
    chmod -R 775 storage bootstrap/cache

# Switch to www-data user
USER www-data

# After the previous content of your Dockerfile

# Copy the entrypoint script into the container
COPY entrypoint.sh /usr/local/bin/

# Make the entrypoint script executable
#RUN chmod +x /usr/local/bin/entrypoint.sh

# Use the entrypoint script to initialize the container
#ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
ENTRYPOINT ["sh", "/usr/local/bin/entrypoint.sh"]

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]







# # Use the official PHP image with FPM
# FROM php:8.1.2-fpm

# # Set working directory
# WORKDIR /var/www

# # Install system dependencies, PHP, and Composer dependencies
# RUN apt-get update && apt-get install -y \
#     build-essential \
#     libpng-dev \
#     libjpeg62-turbo-dev \
#     libfreetype6-dev \
#     locales \
#     zip \
#     jpegoptim optipng pngquant gifsicle \
#     vim \
#     unzip \
#     git \
#     curl \
#     libonig-dev \
#     libxml2-dev \
#     libzip-dev \
#     nodejs \
#     npm && \
#     apt-get clean && rm -rf /var/lib/apt/lists/* && \
#     docker-php-ext-install pdo_mysql mbstring zip exif pcntl gd

# # Install Composer globally
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# # Node.js and NPM are already installed above, so no need to do it again here

# # Create necessary Laravel directories (if they are not going to be mounted from host)
# RUN mkdir -p storage/logs storage/framework/sessions storage/framework/cache storage/framework/views bootstrap/cache

# # Copy existing application directory contents
# COPY . .

# # Set correct permissions for Laravel
# RUN chown -R www-data:www-data . && chmod -R 775 storage bootstrap/cache

# # Switch to non-root user
# USER www-data

# # Copy the entrypoint script
# COPY --chown=www-data:www-data entrypoint.sh /usr/local/bin/entrypoint.sh

# # Ensure the entrypoint script is executable
# USER root
# RUN chmod +x /usr/local/bin/entrypoint.sh
# USER www-data

# # Set the entrypoint to initialize the container
# ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# # Expose port 9000 and start php-fpm server
# EXPOSE 9000
# CMD ["php-fpm"]
