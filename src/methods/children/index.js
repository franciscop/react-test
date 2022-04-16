import $ from "../constructor";

$.prototype.children = function (selector = "*") {
  return this.map((node) => {
    return [...node.childNodes].filter((node) => node.matches(selector));
  });
};
