import $ from "../constructor";

// The default callback does nothing, just keep it the same
$.prototype.map = function (callback) {
  // We don't want to select repeated nodes
  return $(this.toArray().map(callback).flat().filter(Boolean), this).unique();
};
