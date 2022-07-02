import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.toArray = function (callback) {
  if (callback) return this.nodes.map(callback);
  return this.nodes;
};
