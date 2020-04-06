import React, { useState } from "react";
import $ from "./";
import "babel-polyfill";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return <div onClick={increment}>{counter}</div>;
};

describe("<Counter />", () => {
  it("can render to HTML", async () => {
    const $test = $(<Counter />);
    expect($test.text()).toEqual("0");
  });

  it("Will increment the counter", async () => {
    const $counter = $(<Counter />);
    expect($counter.text()).toEqual("0");
    await $counter.click();
    expect($counter.text()).toEqual("1");
    await $counter.click();
    expect($counter.text()).toEqual("2");
  });

  it("Keeps counters independent", async () => {
    const $counter1 = $(<Counter />);
    const $counter2 = $(<Counter />);
    expect($counter1.text()).toEqual("0");
    expect($counter2.text()).toEqual("0");

    await $counter2.click();
    expect($counter1.text()).toEqual("0");
    expect($counter2.text()).toEqual("1");

    await $counter1.click();
    expect($counter1.text()).toEqual("1");
    expect($counter2.text()).toEqual("1");
  });

  describe("nested", () => {
    const Counter = () => {
      const [counter, setCounter] = useState(0);
      const increment = () => setCounter(counter + 1);
      return (
        <div>
          <div className="counter" onClick={increment}>
            {counter}
          </div>
        </div>
      );
    };

    it("nested", async () => {
      const $counter = $(<Counter />);
      expect($counter.text()).toEqual("0");
      await $counter.click();
      expect($counter.text()).toEqual("0");
      await $counter.find(".counter").click();
      expect($counter.text()).toEqual("1");
      await $counter.click();
      expect($counter.text()).toEqual("1");
    });
  });
});
