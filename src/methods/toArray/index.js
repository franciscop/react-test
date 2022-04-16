import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.toArray = function () {
  return this.nodes;
};
