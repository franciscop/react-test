import $ from "../constructor";

$.prototype.map = function(callback) {
  return callback ? $(this.nodes).unique().nodes.map(callback) : this;
};
