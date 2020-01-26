import $ from "../constructor";

$.prototype.click = function(...args) {
  const selector = args.find(a => typeof a === "string");
  const time = args.find(a => typeof a === "number");
  return this.find(selector).trigger("click", time);
};
