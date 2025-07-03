import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react'],
          maps: ['leaflet', 'react-leaflet'],
          i18n: ['react-i18next', 'i18next', 'i18next-browser-languagedetector']
        }
      }
    }
  },
  server: {
    host: true,
    port: 5173
  }
})