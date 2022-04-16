import $ from "../constructor";

$.prototype.text = function () {
  const node = this.first();
  return node ? node.textContent : "";
};
