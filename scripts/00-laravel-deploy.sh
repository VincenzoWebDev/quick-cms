#!/bin/bash

# Aggiorna i pacchetti Composer
composer install --no-dev --optimize-autoloader

# Genera la chiave dell'applicazione
php artisan key:generate

# Esegui le migrazioni
php artisan migrate --force

# Compila gli asset
npm run production

# Cancella la cache
php artisan cache:clear

# Avvia il server web (Nginx)
nginx -g "daemon off;"