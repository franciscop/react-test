export default {
  testEnvironment: "jsdom",
  // react-test ships as ESM, so Babel needs to transform it as well
  transformIgnorePatterns: ["/node_modules/(?!react-test/)"],
};
