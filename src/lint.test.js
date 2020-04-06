const CLIEngine = require("eslint").CLIEngine;

const getLinterErrors = files => {
  const cli = new CLIEngine();
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
