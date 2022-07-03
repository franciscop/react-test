import $ from "../constructor";

$.prototype.not = function (filter = "*") {
  if (typeof filter === "function") {
    throw new Error("A callback is not allowed for .not()");
  }
  return this.filter((node) => !$(node).is(filter));
};
