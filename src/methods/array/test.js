import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".array()", () => {
  describe("readme", () => {
    it("can get the text of the children", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );

      const text = list.children().array((item) => $(item).text());
      expect(text).toEqual(["A", "B"]);
    });

    it("extracts an array of Strings from a list", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );
      const items = list.children().array((node) => node.textContent);
      expect(items).toEqual(["A", "B"]);
    });
  });
});
