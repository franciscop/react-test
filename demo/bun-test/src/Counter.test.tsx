import $ from "react-test";
import Counter from "./Counter";

describe("Counter", () => {
  it("is initialized to 0", () => {
    expect($(<Counter />)).toHaveText("0");
  });

  it("can be incremented with a click", async () => {
    const $counter = $(<Counter />);
    await $counter.click();
    await $counter.click();
    expect($counter).toHaveText("2");
  });
});
