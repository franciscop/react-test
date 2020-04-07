// Counter.test.js;
import React from "react";
import $ from "react-test";
import Counter from "./Counter";

describe("Counter.js", () => {
  it("starts with 0", () => {
    const counter = $(<Counter />);
    expect(counter).toHaveText("0");
  });

  it("increments when clicked", async () => {
    const counter = $(<Counter />);
    await counter.click();
    expect(counter).toHaveText("1");
  });

  it("can be incremented multiple times", async () => {
    const counter = $(<Counter />);
    await counter.click();
    await counter.click();
    await counter.click();
    expect(counter).toHaveText("3");
  });

  it("remains independent of other components", async () => {
    const counter1 = $(<Counter />);
    const counter2 = $(<Counter />);
    await counter2.click();
    expect(counter1).toHaveText("0");
    expect(counter2).toHaveText("1");
  });
});
