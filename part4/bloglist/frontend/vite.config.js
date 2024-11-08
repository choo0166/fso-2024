import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/* https://vitejs.dev/config/
See also https://vitest.dev/config for vitest config
*/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true,
      },
    },
    port: 3000
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.js'
  }
})
