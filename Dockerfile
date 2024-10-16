# Usa un'immagine base con PHP e Nginx
FROM php:8.1-fpm

# Installa le estensioni PHP necessarie
RUN apt-get update && apt-get install -y nginx libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql

# Copia il codice dell'applicazione
COPY . /var/www/html

# Imposta la directory di lavoro
WORKDIR /var/www/html

# Installa Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configura Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Espone la porta 80
EXPOSE 80

# Comando per avviare Nginx
CMD ["nginx", "-g", "daemon off;"]
