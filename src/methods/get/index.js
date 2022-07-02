import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.get = function (index = 0) {
  // Convert it to a plain array
  const array = this.toArray();

  // No elements at all; cannot match
  if (!array.length) return null;

  // Wrap around overflowing indexes
  index = index % array.length;

  // Ensure the index is positive
  index = (array.length + index) % array.length;

  // Return the correct node
  return array[index];
};
