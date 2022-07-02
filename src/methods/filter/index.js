import $ from "../constructor";

$.prototype.filter = function (selector) {
  if (!selector) return this;
  if (typeof selector === "string") {
    const sel = selector;
    selector = (node) => node.matches(sel);
  }
  return $(this.toArray().filter(selector), this);
};
