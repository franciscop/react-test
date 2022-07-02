import $ from "../constructor";

$.prototype.html = function () {
  const node = this.get(0);
  return node ? node.outerHTML : "";
};
