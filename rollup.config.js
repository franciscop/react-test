import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: {
      file: "index.min.js",
      name: "$",
      format: "umd",
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react-dom/client": "ReactDOMClient",
        "react-dom/test-utils": "testUtils",
      },
    },
    external: ["react", "react-dom", "react-dom/client", "react-dom/test-utils"],
    plugins: [
      babel({
        exclude: "node_modules/**",
        extensions: [".js", ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: [
          ["@babel/env", { targets: { node: 24 } }],
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
      }),
      terser(),
    ],
  },
  {
    input: ".types/index.d.ts",
    output: { file: "index.d.ts", format: "esm" },
    plugins: [dts({ tsconfig: "./tsconfig.build.json" })],
  },
];
