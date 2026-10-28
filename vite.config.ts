import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * BASE_PATH pozwala opublikować wersję demonstracyjną na GitHub Pages
 * w podkatalogu (np. /grupasportex-demo/), a po migracji na domenę
 * docelową uruchomić build z BASE_PATH="/".
 */
export default defineConfig({
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssMinify: true,
    assetsInlineLimit: 2048,
  },
  server: {
    port: 5178,
    host: "127.0.0.1",
  },
  preview: {
    port: 4178,
    host: "127.0.0.1",
  },
});
