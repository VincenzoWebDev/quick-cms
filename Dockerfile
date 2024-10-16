# Usa un'immagine base con PHP e Nginx
FROM php:8.1-fpm

# Installa le estensioni PHP necessarie e Nginx
RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libpq-dev unzip git && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_pgsql

# Imposta la directory di lavoro
WORKDIR /var/www/html

# Copia il codice dell'applicazione
COPY . .

# Installa Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Installa le dipendenze di Composer
RUN composer install --no-dev --optimize-autoloader

# Copia lo script di deploy nel container
COPY scripts/00-laravel-deploy.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh  # Assicurati che il file sia eseguibile

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Comando per avviare il server Nginx e PHP
CMD ["nginx", "-g", "daemon off;"]
