import $ from "../constructor";
const whitespace = (str) => str.replace(/\s+/g, " ");

$.prototype.text = function () {
  const node = this.get(0);
  return node ? whitespace(node.textContent) : "";
};
