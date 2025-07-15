import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    // during dev
    historyApiFallback: true,
  },
  build: {
    // during production
    rollupOptions: {
      input: '/index.html',
    },
  }
})
