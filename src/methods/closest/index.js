import $ from "../constructor";

$.prototype.closest = function (selector = "*") {
  return this.map((node) => node.closest(selector));
};
