import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      exclude: [
        "src/**/*.test.*",
        "src/**/test.tsx",
        "src/**/test.ts",
        "src/vitest.setup.ts",
      ],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "index.min.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client", "react-dom/test-utils"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react-dom/client": "ReactDOMClient",
          "react-dom/test-utils": "testUtils",
        },
      },
    },
    minify: "esbuild",
    sourcemap: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "src/**/test.{ts,tsx}"],
  },
});
