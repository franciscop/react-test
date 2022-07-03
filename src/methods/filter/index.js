import $ from "../constructor";

$.prototype.filter = function (selector = "*") {
  // An plain string
  if (typeof selector === "string") {
    const sel = selector;
    selector = (node) => node.matches(sel);
  }
  // An instance of ReactTest
  if (selector.nodes) {
    const sel = selector;
    selector = (node) => sel.nodes.includes(node);
  }
  return $(this.array().filter(selector), this);
};
