// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// });


// import { defineConfig } from 'vite';
// import fs from 'fs';
// import path from 'path';
// import react from '@vitejs/plugin-react';
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, 'certs/key.pem')),
//       cert: fs.readFileSync(path.resolve(__dirname, 'certs/cert.pem')),
//     },
//     port: 5173,
//   },
//      resolve: {
//      alias: {
//        '@': path.resolve(__dirname, './src'),
//      },
//    },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api/kernel': {
        target: 'http://192.168.60.23:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kernel/, '/api/v1')
      },
      '/api/buy': {
        target: 'http://192.168.60.23:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/buy/, '/api/v1')
      },
      '/api/sale': {
        target: 'http://192.168.60.23:8002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sale/, '/api/v1')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});