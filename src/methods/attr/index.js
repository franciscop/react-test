import $ from "../constructor";

$.prototype.attr = function (name) {
  const node = this.get(0);
  return node && node.getAttribute(name);
};
