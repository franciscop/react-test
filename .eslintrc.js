module.exports = {
  env: {
    node: true,
    commonjs: true,
    es6: true,
    browser: true,
    "jest/globals": true
  },
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
    "jest/valid-expect": "error",
    "react/prop-types": "off"
  }
};
