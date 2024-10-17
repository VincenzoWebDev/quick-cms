#!/bin/bash

# Comandi esistenti per Composer, cache, migrazioni ecc.
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

# Avvia Nginx in background
service nginx start

# Avvia PHP-FPM
php-fpm
