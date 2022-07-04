import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.array = function (callback = (node) => node) {
  if (typeof callback === "string") {
    const key = callback;
    callback = (node) => node[key];
  }
  return this.nodes.map(callback);
};
