import $ from "../constructor";

$.prototype.find = function(selector) {
  if (!selector) return this;
  const nodes = this.nodes
    .map(node => [...node.querySelectorAll(selector)])
    .flat(); // So nice :)
  return $(nodes);
};
