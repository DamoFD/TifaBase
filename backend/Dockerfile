FROM php:8.2-apache

# Enable mod_rewrite
RUN a2enmod rewrite

# Set the document root to the public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Update Apache config
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

