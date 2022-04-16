// [INTERNAL USE ONLY
// Retrieves a clear name for the passed element

export default (el) => {
  // Get the full HTML tag WITHOUT its contents
  const html = el.cloneNode(false).outerHTML;

  // Regex should NOT be used generally for HTML. We make an exception here
  // because it's a very strict regex out of a very well defined output string
  return html.replace(/<\/[a-zA-Z0-9-]+>$/, "");
};
