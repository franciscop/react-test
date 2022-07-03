import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.array = function (callback = (node) => node) {
  return this.nodes.map(callback);
};
