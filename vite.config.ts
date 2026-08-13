import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:color"; @use "@/assets/styles/variables" as *;`
      }
    }
  },
  server: {
    proxy: {
      '/api-wows': {
        target: 'https://vortex.worldofwarships.eu',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-wows/, '')
      }
    }
  }
});