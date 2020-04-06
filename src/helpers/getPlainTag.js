// [INTERNAL USE ONLY]
// getPlainTag()
// Get the full HTML tag without its contents
export default el => {
  const html = el.cloneNode(false).outerHTML;

  // Regex should NOT be used generally for HTML. We make an exception here
  // because it's a very strict regex out of a very well defined output string
  return html.replace(/<\/[a-zA-Z0-9-]+>$/, "");
};
