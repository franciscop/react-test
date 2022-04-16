import $ from "../constructor";

// Right now this is forced to be async just for the sake of it (from trigger).
// This is because I'm fairly confident the final API will be async
$.prototype.click = function () {
  return this.trigger("click");
};
