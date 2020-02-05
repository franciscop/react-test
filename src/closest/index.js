import $ from "../constructor";

$.prototype.closest = function(selector) {
  if (!selector) return this;
  const nodes = this.map(node => {
    do {
      if (node.matches(selector)) {
        return node;
      }
    } while ((node = node.parentNode) && node !== document);
  });
  return $(nodes).unique();
};
