import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' —— 使站点可部署在任意路径（GitHub Pages 的 /<repo>/ 子路径）而无需改配置。
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
