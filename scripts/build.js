import files from "files";
import Handlebars from "handlebars";
import marked from "marked";
import sass from "node-sass";
import cmd from "atocha";

const { abs, read, walk, write } = files;
const hbs = (tpl, data = {}) => Handlebars.compile(tpl)(data);
const scss = (file, to) => {
  return new Promise((done, fail) => {
    sass.render({ file, outputStyle: "compressed" }, async (error, result) => {
      if (error) return fail(error);
      await write(to, result.css.toString());
      done();
    });
  });
};

// This is to sort the paths by their depth in the filesystem
const depth = path => (path ? path.replace(/[^\/]/g, "").length : 0);

const methodsBeforeMatchers = tocOrder => (a, b) => {
  const keyA = tocOrder.findIndex(name => a.includes(name));
  const keyB = tocOrder.findIndex(name => b.includes(name));
  if (keyA === -1 && keyB === -1) return 0;
  if (keyA === -1) return -1;
  if (keyB === -1) return 1;
  if (keyA > keyB) return 1;
  if (keyB > keyA) return -1;
  return 0;
};

const createToc = content => {
  const intro = { title: "Introduction", level: "primary", hash: "top" };
  const levels = { "2": "primary", "3": "secondary" };
  const sections = content
    .split("\n")
    .map(a => a.match(/<h(2|3) id=\"([a-z\-]+)\">([^\<]+)<\/h(2|3)>/))
    .filter(Boolean)
    .map(([, level, hash, title]) => ({ hash, title, level: levels[level] }));
  let toc = `<h2><a href="#top">React Test</a></h2>`;
  [intro, ...sections].forEach((sec, i, secs) => {
    const around = [secs[i - 1], sec, secs[i + 1]];
    const [prev, level, next] = around.map(sec => sec && sec.level);

    // Start new section
    if (level === "secondary" && prev === "primary") {
      toc += `<section>`;
    }
    toc += `
      <div class="entry ${level}">
        ${level === "primary" ? '<label class="more"></label>' : ""}
        <a href="#${sec.hash}">${sec.title}</a>
      </div>
    `;
    if (level === "secondary" && next !== "secondary") {
      toc += `</section>`;
    }
  });
  return toc;
};

// Optional read a toc.json file from `src/`:
const readConfig = async () => {
  const configFile = await read("./docs/config.json");
  const config = configFile ? JSON.parse(configFile) : {};
  return { menu: [], ...config };
};

// Generate the bundled javascript file
const buildJavascript = async () => {
  try {
    await cmd(`rollup -c ./scripts/rollup.config.js`);
  } catch (error) {}
};

const buildCss = async () => {
  // Generate the CSS file
  await scss("./docs/style.scss", "./docs/style.min.css");
};

const buildHtml = async () => {
  const config = await readConfig();

  // Generate the HTML files
  const content = await walk("./src")
    .filter(/\.md$/)
    .concat(await abs("./readme.md"))
    .sort((a, b) => a.localeCompare(b))
    .sort((a, b) => depth(a) - depth(b))
    .sort(methodsBeforeMatchers(config.menu))
    .map(read)
    // Because it breaks with 2nd arg as the index
    .map(page => marked(page))
    // We don't want the id="..." in the h4 levels
    .map(html => html.replace(/<h4 id="\w+">/g, "<h4>"))
    // We DON'T want the ids to finish with "-"
    .map(html => html.replace(/-">/g, '">'))
    .join("\n\n");

  const toc = createToc(content);

  const page = await read("./docs/index.hbs");
  const html = hbs(page, { content, toc });
  await write("./docs/index.html", html);
};

// This builds the whole site from the readmes, using marked and handlebars
const build = () => Promise.all([buildJavascript(), buildCss(), buildHtml()]);

build().then(
  () => console.log("\x1b[32m", "✓", "\x1b[0m", "Built all successfully"),
  error => console.error(error)
);

export default build;
