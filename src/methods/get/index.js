import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.get = function (index = 0) {
  const array = this.toArray();
  if (index < 0) index = array.length + index;
  return array[index];
};
