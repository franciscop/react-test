import $ from "../constructor";

$.prototype.parent = function (selector) {
  if (!selector) return this.first().parentNode;
  return [...this.map((node) => node.parentElement)].reduce((node) =>
    node.matches(selector)
  );
};
