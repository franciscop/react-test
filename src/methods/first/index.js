import $ from "../constructor";

$.prototype.first = function () {
  return this.get(0) || null;
};
