import $ from "../constructor";

// The default callback does nothing, just keep it the same
$.prototype.map = function(callback = node => node) {
  // We don't want to select repeated nodes
  return this.nodes.map(callback);
};
