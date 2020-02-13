import $ from "../constructor";

$.prototype.is = function(selector = "*") {
  return this.nodes.some(node => node.matches(selector));
};
