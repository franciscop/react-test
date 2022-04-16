import $ from "../constructor";

$.prototype.is = function (selector = "*") {
  return this.toArray().some((node) => node.matches(selector));
};
