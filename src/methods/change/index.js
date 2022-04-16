import $ from "../constructor";

// Right now this is forced to be async just for the sake of it (from trigger).
// This is because I'm fairly confident the final API will be async
$.prototype.change = function (value) {
  // This is needed for uncontrolled inputs
  this.map((node) => {
    if (
      node.nodeName === "INPUT" &&
      ["checkbox", "radio"].includes(node.type)
    ) {
      node.checked = value;
    } else {
      node.value = value;
    }
  });
  return this.trigger("change", { target: { value } });
};
