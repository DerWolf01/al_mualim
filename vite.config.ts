import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import typescript from "@rollup/plugin-typescript";
import ttypescript from "ttypescript";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },

  plugins: [vue(), ],
});
