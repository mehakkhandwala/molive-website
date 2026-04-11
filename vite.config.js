import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      // Forward API calls to "vercel dev" (default port 3000) during local development.
      // Run: vercel dev  (not npm run dev) to get both the frontend + API together.
      '/api': 'http://localhost:3000',
    },
  },
  build: {
    rollupOptions: {
      input: {
        main:                resolve(__dirname, 'index.html'),
        about:               resolve(__dirname, 'about.html'),
        'order-confirmation': resolve(__dirname, 'order-confirmation.html'),
      },
    },
  },
})
