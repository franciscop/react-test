import $ from "../constructor";

$.prototype.children = function (selector = "*") {
  return this.map((node) => [...node.children]).filter(selector);
};
