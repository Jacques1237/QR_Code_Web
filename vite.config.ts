import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/QR_Code_Web/', // 👈 This is the key line for GitHub Pages
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
