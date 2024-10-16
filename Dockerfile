# Usa l'immagine richarvey/nginx-php-fpm
FROM richarvey/nginx-php-fpm:3.1.6

# Installa le dipendenze di sistema e le estensioni PHP necessarie
RUN apk add --no-cache \
    git \
    unzip \
    libpng \
    libjpeg-turbo \
    postgresql-dev \
    freetype-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Imposta la cartella di lavoro
WORKDIR /var/www/html

# Copia il codice del progetto
COPY . .

# Installa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installa le dipendenze PHP
RUN composer install --no-dev --optimize-autoloader

# Copia lo script di deploy
COPY scripts/00-laravel-deploy.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Comando di avvio per Nginx e PHP-FPM
CMD ["/usr/local/bin/start.sh"]
