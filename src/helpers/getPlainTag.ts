// [INTERNAL USE ONLY
// Retrieves a clear name for the passed element

export default (el: Element | null): string | null => {
  if (!el) return null;

  const tag = el.tagName.toLowerCase();

  const attrs = [...el.attributes]
    .sort((a, b) => a.name.localeCompare(b.name)) // enforce order
    .map((attr) => `${attr.name}="${attr.value}"`)
    .join(" ");

  return `<${tag}${attrs ? " " + attrs : ""}>`;
};
