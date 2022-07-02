import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".toArray()", () => {
  describe("readme", () => {
    it("can get the text of the children", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );

      const text = list.children().toArray((item) => $(item).text());
      expect(text).toEqual(["A", "B"]);
    });
  });
});
