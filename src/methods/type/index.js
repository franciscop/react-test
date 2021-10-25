import $ from '../constructor'

// Right now this is forced to be async just for the sake of it (from trigger).
// This is because I'm fairly confident the final API will be async
$.prototype.type = function (value) {
  // const selector = args.find(a => typeof a === "string");
  // const time = args.find(a => typeof a === "number");
  // console.log(this.nodes);
  return this.trigger('change', 0, { target: { value } })
}
