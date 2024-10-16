# Usa un'immagine base con PHP 8.2 e le estensioni richieste
FROM php:8.2-fpm

# Installa le dipendenze di sistema e le estensioni PHP necessarie
RUN apt-get update && apt-get install -y \
    nginx \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Copia il codice del progetto nella directory di lavoro del container
WORKDIR /var/www/html
COPY . .

# Installa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installa le dipendenze di PHP con Composer
RUN composer install --no-dev --optimize-autoloader

# Copia lo script di deploy nel container e rendilo eseguibile
COPY scripts/00-laravel-deploy.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Espone la porta
EXPOSE 80

# Comando di avvio per Nginx e PHP-FPM
CMD ["/usr/local/bin/start.sh"]
