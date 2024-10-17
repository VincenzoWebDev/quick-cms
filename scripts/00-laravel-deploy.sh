#!/bin/bash

# Comandi esistenti per Composer, cache, migrazioni ecc.
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

npm install

# Costruisce i file statici con Vite
npm run build

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

# Avvia PHP-FPM in background
php-fpm &

# Avvia Nginx come processo principale
nginx -g 'daemon off;'