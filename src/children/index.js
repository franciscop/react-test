import $ from "../constructor";

$.prototype.children = function (selector = "") {
  const children = [];
  this.nodes.forEach(node => {
    node.childNodes.forEach(childNode => {
      if (!selector) {
        children.push(childNode);
      }
      if (childNode.matches(selector)) {
        children.push(childNode);
      }
    })
  })
  return $(children);
};