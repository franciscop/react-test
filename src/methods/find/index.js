import $ from "../constructor";

$.prototype.find = function(selector) {
  if (!selector) return this;
  const nodes = this.nodes
    .map(node => [...node.querySelectorAll(selector)])
    .flatten(); // So nice :)
  return $(nodes);
};
