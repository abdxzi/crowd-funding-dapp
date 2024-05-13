import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
      '@css': '/src/assets/css',
      '@config': '/src/config',
      '@assets': '/src/assets',
      '@constants': '/src/constants',
      '@pages': '/src/pages',
      // '@utils': '/src/utils',
      // '@context': '/src/context',
      // Add more aliases as needed
    },
  },
})
