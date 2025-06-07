import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "use client" warnings from framer-motion
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      }
    }
  },
  css: {
    devSourcemap: true
  },
  esbuild: {
    logOverride: { 'css-syntax-error': 'silent' }
  }
})
