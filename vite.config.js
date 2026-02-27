// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// Use different ports for dev vs prod to allow running both simultaneously
// Dev: 7337 (frontend), 5437 (backend)
// Prod: 6337 (frontend), 5337 (backend)
const DEV_PORT = parseInt(process.env.VITE_PORT || '7337');

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base:'./',
  server: {
    port: DEV_PORT,
    strictPort: true, // Fail if port is already in use instead of trying another
  },
  define: {
    // command === 'serve' when running the dev server (npm run dev)
    // command === 'build' when producing the production bundle (vite build)
    "import.meta.env.VITE_DEV_MODE": JSON.stringify(command === "serve"),
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  optimizeDeps: {
    include: [
      'react-markdown',
      'remark-gfm',
      'remark-math',
      'rehype-katex',
      'react-syntax-highlighter',
      'react-syntax-highlighter/dist/cjs/styles/prism'
    ]
  }
}));
