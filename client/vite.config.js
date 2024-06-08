

import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel([
            'resources/css/app.css',
            './src/Home.js', // Update the entry module here
        ]),
    ],
});
