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
      external: [
        "react",
        "react-dom",
        "react-dom/client",
        "react-dom/test-utils",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOMClient",
          "react-dom/test-utils": "testUtils",
        },
      },
    },
    minify: "terser",
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/vitest.setup.ts"],
    // Needed for the plain test.tsx files
    include: ["src/**/*.test.{ts,tsx}", "src/**/test.{ts,tsx}"],
  },
});
