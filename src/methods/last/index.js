import $ from "../constructor";

$.prototype.last = function() {
  return this.nodes[this.nodes.length - 1] || null;
};
