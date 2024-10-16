#!/usr/bin/env bash 
echo "Esecuzione di composer" 
composer install --no-dev --working-dir=/var/www/html 

echo "Generazione della chiave dell'applicazione..." 
php artisan key:generate --show 

echo "Configurazione di memorizzazione nella cache..." 
php artisan config:cache 

echo "Memorizzazione nella cache delle rotte..." 
php artisan route:cache 

echo "Esecuzione delle migrazioni..." 
php artisan migrate --force