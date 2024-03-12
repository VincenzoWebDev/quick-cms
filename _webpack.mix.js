const mix = require('laravel-mix');

mix
  .setResourceRoot('/quick-cms/public')
  .js('resources/js/app.js', 'public/js')
  .react();

