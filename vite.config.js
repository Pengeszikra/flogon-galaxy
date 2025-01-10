import { defineConfig } from 'vite';
import { resolve } from 'path';
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
});
