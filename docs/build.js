import files from "files";
import Handlebars from "handlebars";
import marked from "marked";
const { read, walk, write } = files;
const hbs = (tpl, data = {}) => Handlebars.compile(tpl)(data);

// This is to sort the paths by their depth in the filesystem
const depth = path => (path ? path.replace(/[^\/]/g, "").length : 0);

// This builds the whole site from the readmes, using marked and handlebars
const build = async (req, res, next = () => {}) => {
  try {
    const content = await walk("./src")
      .filter(/\.md$/)
      .concat("./readme.md")
      .sort((a, b) => a.localeCompare(b))
      .sort((a, b) => depth(a) - depth(b))
      .map(read)
      .map(page => marked(page)) // Because it breaks with 2nd arg as the index
      .join("\n\n");
    const sections = content
      .split("\n")
      .map(a => a.match(/<h2 id=\"([a-z\-]+)\">([^\<]+)<\/h2>/))
      .filter(Boolean)
      .map(([, hash, title]) => ({ hash, title }));
    const toc = sections
      .map(link => `<a href="#${link.hash}">${link.title}</a>`)
      .join("\n");
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
