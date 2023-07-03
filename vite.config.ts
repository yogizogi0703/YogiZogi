import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/FE',
  test: {
    globals: true,
    setupFiles: ['./src/mocks/setupTests.ts'],
    environment: 'jsdom'
  },
  define: {
    'process.env.NODE_ENV': '"development"'
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, 'public/404.html')
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://13.209.131.228:8443',
        changeOrigin: true,
        secure: false
      }
    }
  }
});
