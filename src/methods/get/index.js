import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.get = function (index = 0) {
  // Convert it to a plain array
  const nodes = this.array();

  // No elements at all; cannot match
  if (!nodes.length) return null;

  // Wrap around overflowing indexes
  index = index % nodes.length;

  // Ensure the index is positive
  index = (nodes.length + index) % nodes.length;

  // Return the correct node
  return nodes[index];
};
