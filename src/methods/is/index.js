import $ from "../constructor";

$.prototype.is = function (selector = "*") {
  return this.filter(selector).length === this.length;
};
