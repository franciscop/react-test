import $ from "../constructor";

$.prototype.html = function () {
  const node = this.first();
  return node ? node.outerHTML : "";
};
