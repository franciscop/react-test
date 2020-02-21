import $ from "../constructor";

$.prototype.children = function (selector = "") {
  const children = [];
  this.nodes.forEach(node => {
    node.childNodes.forEach(childNode => {
      if (selector) {
        if (childNode.matches(selector)) {
          children.push(childNode);
        }
      } else {
        children.push(childNode);
      }
    })
  })
  return $(children);
};
