import $ from "../constructor";

$.prototype.data = function (name) {
  return this.attr(`data-${name}`);
};
