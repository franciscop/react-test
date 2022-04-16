import $ from "../constructor";

// Right now this is forced to be async just for the sake of it (from trigger).
// This is because I'm fairly confident the final API will be async
$.prototype.submit = function (...args) {
  const selector = args.find((a) => typeof a === "string");
  const time = args.find((a) => typeof a === "number");
  return this.find(selector).trigger("submit", time);
};
