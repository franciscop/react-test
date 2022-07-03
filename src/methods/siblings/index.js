import $ from "../constructor";

$.prototype.siblings = function (selector) {
  return this.parent().children(selector).not(this);
};
