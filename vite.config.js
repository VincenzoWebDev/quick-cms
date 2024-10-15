import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import cors from 'cors';

export default defineConfig({
    // base: './quick-cms/public/',
    plugins: [
        laravel({
            input: ['resources/css/admin/app.css', 'resources/css/quick_cms/app.css', 'resources/sass/app.scss', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
    ],
    server: {
        middleware: [
            cors(),
        ],
    },
});
