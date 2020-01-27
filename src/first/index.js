import $ from "../constructor";

$.prototype.first = function() {
  return this.nodes[0] || null;
};
