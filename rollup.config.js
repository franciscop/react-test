import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "index.min.js",
    name: "$",
    format: "umd",
    // This is because we use default and named exports at the same time. The
    // commonjs will have to import with ['default'], but no problem for ESM
    exports: "named",

    globals: {
      window: "Window",
      react: "React",
      "react-dom": "ReactDOM",
      "react-dom/test-utils": "testUtils",
    },
  },
  external: ["window", "react", "react-dom", "react-dom/test-utils"],
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs({ namedExports: { "react-dom/test-utils": ["act"] } }),
    json(),
    terser(),
  ],
};
