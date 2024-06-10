import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  define:{
    'process.env.VITE_OPENAI_API_KEY' : JSON.stringify(process.env.VITE_OPENAI_API_KEY)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
