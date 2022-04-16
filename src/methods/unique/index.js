// [INTERNAL USE ONLY]
import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.unique = function () {
  const nodes = [];
  this.toArray().forEach((node) => {
    if (nodes.includes(node)) return;
    nodes.push(node);
  });
  return $(nodes, this);
};
