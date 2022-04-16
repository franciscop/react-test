import $ from "../constructor";

// Right now this is forced to be async just for the sake of it (from trigger).
// This is because I'm fairly confident the final API will be async
$.prototype.type = async function (input) {
  const strings = input.split("").map((k, i) => input.slice(0, i + 1));
  for (let value of strings) {
    await this.change(value);
    await this.delay(10);
  }
};
