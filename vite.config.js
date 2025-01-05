import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        throw: resolve(__dirname, 'throw.html'),
        story: resolve(__dirname, 'story.html'),
        travel: resolve(__dirname, 'travel.html'),
        quest: resolve(__dirname, 'quest.html'),
      }
    }
  },
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
