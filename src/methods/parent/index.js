import $ from "../constructor";

$.prototype.parent = function (selector) {
  if (!selector) return this.map((node) => node.parentNode);
  return this.find(selector).map((node) => node.parentNode);
};
