import React from "react";
import $ from "../../";
import "babel-polyfill";

const list = $(
  <ul>
    <li>A</li>
    <li className="active">B</li>
    <li>C</li>
  </ul>
);

describe(".siblings()", () => {
  it("can get its siblings", () => {
    const out = list
      .find(".active")
      .siblings()
      .array((node) => node.textContent);
    expect(out).toEqual(["A", "C"]);
  });
});
