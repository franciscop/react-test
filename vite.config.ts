import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "index.min.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client"],
    },
    minify: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    // Needed for the plain test.tsx files
    include: ["src/**/*.test.{ts,tsx}", "src/**/test.{ts,tsx}"],
  },
});
