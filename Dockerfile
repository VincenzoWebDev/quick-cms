# Usa un'immagine di PHP con Apache
FROM php:8.1-apache

# Installa le estensioni PHP necessarie per Laravel e PostgreSQL
RUN docker-php-ext-install pdo pdo_pgsql

# Imposta la directory di lavoro
WORKDIR /var/www/html

# Copia il codice dell'applicazione
COPY . .

# Installa Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Espone la porta 80 (Render gestirà le porte)
EXPOSE 80
