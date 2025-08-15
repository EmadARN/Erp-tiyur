import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/kernel": {
        target: "http://192.168.76.162:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/kernel/, "/api/v1"),
      },
      "/api/buy": {
        target: "http://192.168.76.162:8001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/buy/, "/api/v1"),
      },
      "/api/sale": {
        target: "http://192.168.76.162:8002",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sale/, "/api/v1"),
      },

      "/api/warehouse": {
        target: "http://192.168.76.162:8003",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/warehouse/, "/api/v1"),
      },
      "/api/production": {
        target: "http://192.168.76.162:8004",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/production/, "/api/v1"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
