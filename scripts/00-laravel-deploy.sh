#!/bin/bash

# Installazione delle dipendenze con Composer
echo "Running composer"
composer install --no-dev

# Installazione delle dipendenze JavaScript
echo "Installing npm packages"
npm install --prefix /var/www/html

# Costruzione dei file statici con Vite
echo "Building assets with Vite"
npm run build --prefix /var/www/html

# Imposta i permessi per le directory storage e bootstrap/cache
echo "Setting permissions..."
chmod -R 775 /var/www/html/storage
chmod -R 775 /var/www/html/bootstrap/cache

# Imposta il proprietario delle directory storage e bootstrap/cache
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache

# Crea il collegamento simbolico per lo storage usando artisan
echo "Creating symbolic link for storage..."
php artisan storage:link

# Crea il file di log se non esiste
touch /var/www/html/storage/logs/laravel.log
chmod 664 /var/www/html/storage/logs/laravel.log
chown www-data:www-data /var/www/html/storage/logs/laravel.log

# Cache della configurazione
echo "Caching config..."
php artisan config:cache

# Cache delle rotte
echo "Caching routes..."
php artisan route:cache

# Esecuzione delle migrazioni
echo "Running migrations..."
php artisan migrate --force

# Avvio di PHP-FPM
php-fpm &

# Avvio di Nginx come processo principale
nginx -g 'daemon off;'
