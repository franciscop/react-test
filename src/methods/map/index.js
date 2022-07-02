import $ from "../constructor";

// The default callback does nothing, just keep it the same
$.prototype.map = function (callback) {
  // We don't want to select repeated nodes
  const nodes = [];
  this.toArray()
    .map(callback)
    // Convert any potential NodeList into an array of plain nodes
    .map((ret) => (ret && ret.forEach ? [...ret] : ret))
    .flat()
    .forEach((node) => {
      if (!node) return;
      if (nodes.includes(node)) return;
      nodes.push(node);
    });
  return $(nodes, this);
};
