import { defineConfig } from 'vite';
import { resolve } from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        fs.readdirSync(__dirname)
          .filter(file => file.endsWith('.html'))
          .map(file => [file.replace('.html', ''), resolve(__dirname, file)])
      )
    }  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  esbuild: {
    jsxFactory: 'fencer', // Use your custom `fencer` function as the JSX factory
    jsxFragment: 'Fragment', // Optional if you use JSX fragments (e.g., `<>...</>`).
  },
  plugins: [
    // Add your custom Fencer configuration here
    VitePWA({
      registerType: 'autoUpdate', // Automatically update the service worker
      manifest: {
        name: 'Fencer PWA App',
        short_name: 'FencerApp',
        description: 'A PWA powered by Fencer Framework',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
