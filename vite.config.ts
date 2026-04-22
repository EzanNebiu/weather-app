import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    // Disable Fast Refresh for debugging
    fastRefresh: false,
  })],
  server: {
    port: 5173,
  },
})
