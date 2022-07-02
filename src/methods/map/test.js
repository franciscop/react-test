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
    expect($list.get(0).nodeName).toBe("UL");
    expect($list.map((node) => node).get(0).nodeName).toBe("UL");
  });

  it("needs a callback", () => {
    expect(() => $list.map()).toThrow();
  });

  describe("readme", () => {
    it("can get a new collection", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );
      // Same as .find('li')
      const items = list.map((node) => node.querySelectorAll("li"));
      expect(items.toArray((node) => node.nodeName)).toEqual(["LI", "LI"]);
    });
  });
});
