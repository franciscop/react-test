import $ from "../constructor";

$.prototype.last = function () {
  return this.get(-1) || null;
};
