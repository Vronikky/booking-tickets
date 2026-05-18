import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    root: 'src',
    publicDir: '../public',
    server: {
        port: 5501,
        open: true
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                korzina: resolve(__dirname, 'src/korzina.html'),
                profile: resolve(__dirname, 'src/profile.html')
            }
        }
    }
});