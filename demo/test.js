// Runs every demo against each supported React version
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const demos = ["vitest-jsdom", "vitest-happy-dom", "bun-test", "jest"];
const versions = ["18", "19"];
const packages = ["react", "react-dom", "@types/react", "@types/react-dom"];

for (const demo of demos) {
  const cwd = fileURLToPath(new URL(`./${demo}/`, import.meta.url));
  const run = (cmd) => execSync(cmd, { cwd, stdio: "inherit" });
  run("rm -rf node_modules/react-test && npm install");
  for (const version of versions) {
    console.log(`\n> ${demo} with React ${version}`);
    const list = packages.map((name) => `${name}@${version}`).join(" ");
    run(`npm install --no-save ${list}`);
    // The install above is the only setup needed, so skip "pretest"
    run("npm test --ignore-scripts");
  }
}
