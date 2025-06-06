import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.jsx'),
      name: 'CheckoutComponent',
      fileName: 'fs-commerce-library',
      formats: ['iife'],
    },
    rollupOptions:{
      output:{
        globals:{}
      },
      // external:['react', 'react-dom'],
    }
  },
})