import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  resolve: {
    extensions: ['.mjs', '.ts', '.js', '.jsx', '.tsx', '.json', '.vue'],
    // The vite-tsconfig-paths plugin doesn't work with sass and scss
    // so manually copy & paste here
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  build: {
    chunkSizeWarningLimit: 1600
  }
});
