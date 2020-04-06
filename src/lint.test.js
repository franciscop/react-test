const CLIEngine = require("eslint").CLIEngine;

const settings = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
    "jest/globals": true
  },
  globals: ["process"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "jest"],
  settings: {
    react: { version: "detect" }
  },
  rules: {
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
};

const getLinterErrors = files => {
  const cli = new CLIEngine(settings);
  const { results } = cli.executeOnFiles(files);
  // Cleans the path to make it nice and readable
  const clean = path => path.replace(process.cwd(), "").replace(/^\//, "");
  return results
    .filter(report => report.errorCount)
    .map(rep => ({ file: clean(rep.filePath), messages: rep.messages }));
};

const formatErrors = err => `  [${err.line}:${err.column}] ${err.message}`;
const formatFiles = ({ file, messages }) =>
  `Linter error${messages.length > 1 ? "s" : ""} on "${file}":\n${messages
    .map(formatErrors)
    .join("\n")}`;

describe("Linter", () => {
  it("has no errors", () => {
    const files = getLinterErrors("src");
    if (files.length) {
      throw new Error(files.map(formatFiles).join("\n\n"));
    }
  });
});
