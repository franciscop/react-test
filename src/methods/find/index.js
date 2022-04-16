import $ from "../constructor";

$.prototype.find = function (selector) {
  if (!selector) return this;
  return this.map((node) => [...node.querySelectorAll(selector)]);
};
