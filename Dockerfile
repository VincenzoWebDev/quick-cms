# Utilizziamo una base image robusta e leggera per PHP
FROM php:8.1-fpm-alpine

# Installa Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Impostiamo la working directory
WORKDIR /var/www/html

# Copiamo il composer.json e installiamo le dipendenze
COPY composer.json composer.lock ./
RUN composer install --no-dev

# Copiamo il resto del progetto
COPY . .

# Installiamo le estensioni PHP necessarie (es: GD, MySQL)
RUN docker-php-ext-install pdo_mysql gd

# Copiamo la configurazione Nginx
COPY conf/nginx/nginx-site.conf /etc/nginx/conf.d/default.conf

# Eseguiamo la build dell'applicazione React (se necessario)
WORKDIR /var/www/html/public
RUN npm install && npm run build

CMD ["/usr/local/bin/start.sh"]