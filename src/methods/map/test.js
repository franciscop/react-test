import React from "react";
import $ from "../../";
import "babel-polyfill";

const $list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
);

describe(".map()", () => {
  it("returns an instance of itself", () => {
    expect($list.map((node) => node)).toBeInstanceOf($);
  });

  it("can perform a noop transformation", () => {
    expect($list.first().nodeName).toBe("UL");
    expect($list.map((node) => node).first().nodeName).toBe("UL");
  });

  it("needs a callback", () => {
    expect(() => $list.map()).toThrow();
  });
});
