import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

/* Config de teste separada da vite.config.js de propósito: aquela carrega o
 * plugin do Base44 (editor, telemetria, HMR), que não tem função nenhuma num
 * teste e só acrescentaria peças que podem falhar por conta própria. */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
});
