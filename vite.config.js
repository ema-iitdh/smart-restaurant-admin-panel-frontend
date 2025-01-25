import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: '/admin',
  plugins: [react()],
  build: {
    outDir: 'admin',
    sourcemap: false, // Disable sourcemaps for production builds
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
