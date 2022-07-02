import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".data()", () => {
  it("returns the correct value when reading a data-attribute", () => {
    const $hello = $(<div data-id="0">Hello</div>);
    expect($hello.data("id")).toBe("0");
  });
  it("returns null if the data-attribute is not present in the node", () => {
    const $hello = $(<div id="0">Hello</div>);
    expect($hello.data("id")).toBe(null);
  });

  describe("readme", () => {
    it("can read the data attributes", () => {
      const card = $(
        <div data-id="25" data-selected selected>
          Card
        </div>
      );
      expect(card.data("id")).toBe("25");
      expect(card.data("selected")).toBe("true"); // T_T 🤷‍♂️ gh/facebook/react/24812
      expect(card.data("name")).toBe(null);
    });
  });
});
