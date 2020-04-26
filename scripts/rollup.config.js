import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "docs/index.js",
  output: {
    file: "docs/index.min.js",
    format: "umd"
  },
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    commonjs({ include: ["docs/**", "node_modules/**"] }),
    json(),
    terser()
  ]
};
