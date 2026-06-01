// vite.config.js
// RESOURCE: https://vitejs.dev/config/
//
// Vite is the build tool that compiles and serves your React app during development.
// It replaces the older Create React App (CRA) and is much faster.
//
// The "proxy" setting below is crucial: it forwards any request starting with /api
// from your frontend (port 5173) to your backend (port 3001).
// This avoids CORS issues during development.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,

    // EXPLANATION: Proxy configuration
    // When your React code calls axios.get('/api/tasks'), Vite intercepts
    // that request and forwards it to http://localhost:3001/api/tasks
    // Your frontend never has to know the backend's port number.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // TODO: (Optional) If you ever rename your API prefix, change '/api' above
        // and the target to match your server port in server/.env
      }
    }
  }
})
