#!/bin/bash

# Installazione delle dipendenze con Composer
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

# Installazione delle dipendenze JavaScript
echo "Installing npm packages"
npm install --prefix /var/www/html

# Costruzione dei file statici con Vite
echo "Building assets with Vite"
npm run build --prefix /var/www/html

# Cache della configurazione
echo "Caching config..."
php artisan config:cache --working-dir=/var/www/html

# Cache delle rotte
echo "Caching routes..."
php artisan route:cache --working-dir=/var/www/html

# Esecuzione delle migrazioni
echo "Running migrations..."
php artisan migrate --force --working-dir=/var/www/html

# Avvio di PHP-FPM
php-fpm &

# Avvio di Nginx come processo principale
nginx -g 'daemon off;'
