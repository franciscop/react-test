import $ from "../constructor";

$.prototype.closest = function (selector) {
  if (!selector) return this;
  let node = this.first();
  do {
    if (node.matches(selector)) {
      return $(node);
    }
  } while ((node = node.parentNode) && node !== document);
}
