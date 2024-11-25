import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import cors from 'cors';

export default defineConfig(({ command, mode }) => {
    let serverConfig = {};

    if (command === 'serve') {
        // Configurazione per l'ambiente locale
        serverConfig = {
            host: 'localhost',
            port: 3000, // Usa 3000 in locale
        };
    } else {
        // Configurazione per l'ambiente di produzione (es. su Render)
        serverConfig = {
            host: '0.0.0.0', // Per ascoltare tutte le interfacce
            port: process.env.PORT || 3000, // Usa la variabile PORT in produzione
        };
    }

    return {
        plugins: [
            laravel({
                input: [
                    'resources/css/admin/app.css',
                    'resources/css/quick_cms/app.css',
                    'resources/css/quick_ecommerce/app.css',
                    'resources/sass/app.scss',
                    'resources/js/app.jsx'
                ],
                buildDirectory: 'build',
                refresh: true,
            }),
            react(),
        ],
        server: {
            ...serverConfig, // Usa la configurazione in base all'ambiente
            middleware: [cors()],
        },
    };
});