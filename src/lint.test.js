const CLIEngine = require("eslint").CLIEngine;

const getLinterErrors = (files) => {
  const cli = new CLIEngine();
  const { results } = cli.executeOnFiles(files);
  // Cleans the path to make it nice and readable
  const clean = (path) => path.replace(process.cwd(), "").replace(/^\//, "");
  return results.map((rep) => ({
    file: clean(rep.filePath),
    errors: rep.messages.filter((msg) => msg.severity === 2),
    warnings: rep.messages.filter((msg) => msg.severity === 1),
  }));
};

const formatErrors = (err) => `  [${err.line}:${err.column}] ${err.message}`;
const formatFiles = (file, messages, type = "error") =>
  `Linter ${type}${messages.length > 1 ? "s" : ""} on "${file}":\n${messages
    .map(formatErrors)
    .join("\n")}`;

describe("Linter", () => {
  getLinterErrors("src").forEach((report) => {
    it(report.file, () => {
      if (report.warnings.length) {
        console.warn(formatFiles(report.file, report.warnings, "warning"));
      }

      if (report.errors.length) {
        throw new Error(formatFiles(report.file, report.errors, "error"));
      }
    });
  });
});
