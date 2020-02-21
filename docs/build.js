import files from "files";
import Handlebars from "handlebars";
import marked from "marked";
import sass from "node-sass";

const { read, walk, write } = files;
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

const methodsBeforeMatchers = (a, b) =>
  a.includes("methods") && b.includes("jest")
    ? -1
    : a.includes("jest") && b.includes("methods")
    ? 1
    : 0;

// This builds the whole site from the readmes, using marked and handlebars
const build = async (req, res, next = () => {}) => {
  try {
    await scss("./docs/style.scss", "./docs/style.min.css");
    const content = await walk("./src")
      .filter(/\.md$/)
      .concat("./readme.md")
      .sort((a, b) => a.localeCompare(b))
      .sort((a, b) => depth(a) - depth(b))
      .sort(methodsBeforeMatchers)
      .map(read)
      .map(page => marked(page)) // Because it breaks with 2nd arg as the index
      .join("\n\n");
    const sections = content
      .split("\n")
      .map(a => a.match(/<h(2|3) id=\"([a-z\-]+)\">([^\<]+)<\/h(2|3)>/))
      .filter(Boolean)
      .map(([, level, hash, title]) => ({
        hash,
        title,
        level: level === "2" ? "primary" : "secondary"
      }));
    let toc = "<section>";
    sections.forEach((sec, i, secs) => {
      // Start new section
      if (sec.level === "secondary" && i && secs[i - 1].level === "primary") {
        toc += `<section>`;
      }
      toc += `
        <div class="entry ${sec.level}">
          ${sec.level === "primary" ? '<label class="more"></label>' : ""}
          <a href="#${sec.hash}">${sec.title}</a>
        </div>
      `;
      if (
        sec.level === "secondary" &&
        secs[i + 1] &&
        secs[i + 1].level === "primary"
      ) {
        toc += `</section>`;
      }
    });
    const page = await read("./docs/index.hbs");
    const html = hbs(page, { content, toc });
    await write("./docs/index.html", html);
    next();
  } catch (error) {
    next(error);
  }
};

build();

export default build;
