// [INTERNAL USE ONLY
// Retrieves a clear name for the passed element

export default (el: Element | null): string | null => {
  if (!el) return null;

  // Get the full HTML tag WITHOUT its contents
  const html = (el.cloneNode(false) as Element).outerHTML;

  // Regex should NOT be used generally for HTML. We make an exception here
  // because it's a very strict regex out of a very well defined output string
  return html.replace(/<\/[a-zA-Z0-9-]+>$/, "");
};
