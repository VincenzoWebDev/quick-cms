# Usa l'immagine richarvey/nginx-php-fpm
FROM richarvey/nginx-php-fpm:latest

# Installa le dipendenze di sistema e le estensioni PHP necessarie
RUN apk add --no-cache git unzip libpng libjpeg-turbo postgresql-dev freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Copia il codice del progetto nella directory di lavoro del container
WORKDIR /var/www/html
COPY . .

# Installa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Copia lo script di deploy nel container e rendilo eseguibile
COPY scripts/00-laravel-deploy.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Avvia PHP-FPM e Nginx insieme
CMD ["sh", "-c", "/usr/local/bin/start.sh && php-fpm -D && nginx -g 'daemon off;'"]

# Espone la porta
EXPOSE 80
