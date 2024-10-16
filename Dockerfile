# Usa l'immagine base con Nginx e PHP-FPM
FROM richarvey/nginx-php-fpm:3.1.6

# Imposta la directory di lavoro
WORKDIR /var/www/html

# Copia il codice del progetto nella directory di lavoro del container
COPY . .

# Installa le dipendenze PHP necessarie
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Installa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installa le dipendenze di PHP con Composer
RUN composer install --no-dev --optimize-autoloader

# Espone la porta 80
EXPOSE 80

# Copia il file di configurazione Nginx
COPY conf/nginx/nginx-site.conf /etc/nginx/conf.d/default.conf

# Comando di avvio per Nginx e PHP-FPM
CMD ["nginx", "-g", "daemon off;"]
