import $ from "../constructor";

$.prototype.map = function(callback) {
  return this.nodes.map(callback);
};
