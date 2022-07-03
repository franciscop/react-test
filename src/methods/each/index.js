import $ from "../constructor";

// The default callback does nothing, just keep it the same
$.prototype.each = function (callback = () => {}) {
  this.array(callback);
  return this;
};
