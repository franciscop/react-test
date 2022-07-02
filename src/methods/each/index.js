import $ from "../constructor";

// The default callback does nothing, just keep it the same
$.prototype.each = function (callback = () => {}) {
  this.toArray().map(callback);
  return this;
};
