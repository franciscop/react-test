import $ from "../constructor";

$.prototype.data = function (value) {
  return this.attr(`data-${value}`);
};
