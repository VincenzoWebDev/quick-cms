#!/usr/bin/env bash

# Esegui i comandi necessari per il deploy
service php-fpm start --force

echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Generating application key..."
php artisan key:generate --show --no-interaction

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Running migrations..."
php artisan migrate --force

# Avvia Nginx in foreground
echo "Starting Nginx..."
nginx -g 'daemon off;'
