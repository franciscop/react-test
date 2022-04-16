import $ from "../constructor";

$.prototype.attr = function (key) {
  const node = this.first();
  return node && node.getAttribute(key);
};
