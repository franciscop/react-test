import $ from "../constructor";

$.prototype.is = function (selector = "*") {
  return this.toArray().every((node) => node.matches(selector));
};
