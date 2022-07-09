import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".array()", () => {
  it("returns an array of nodes by default", () => {
    const greetings = $(<div>Hello</div>);
    const nodes = greetings.array();
    expect(Array.isArray(nodes)).toBe(true);
    expect(nodes[0].nodeName).toBe("DIV");
    expect(nodes[0].textContent).toBe("Hello");
  });

  it("accepts a callback with a simple .map()", () => {
    const greetings = $(<div>Hello</div>);
    const texts = greetings.array((node) => node.nodeName);
    expect(texts).toEqual(["DIV"]);
  });

  it("receives a node, index and list in the callback", () => {
    const greetings = $(<div>Hello</div>);
    const args = greetings.array((...params) => params);
    expect(args[0][0].nodeName).toBe("DIV");
    expect(args[0][1]).toBe(0);
    expect(args[0][2]).toHaveLength(greetings.length);
  });

  it("can receive the property to extract", () => {
    const list = $(
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    );
    expect(list.children().array("textContent")).toEqual(["A", "B", "C"]);
    expect(list.children().array("nodeName")).toEqual(["LI", "LI", "LI"]);
  });

  describe("readme", () => {
    it("can get the text of the children", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );
      const texts = list.children().array("textContent");
      expect(texts).toEqual(["A", "B"]);
    });

    it("can use a key for each of the nodes", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );
      const items = list.children().array("textContent");
      expect(items).toEqual(["A", "B"]);
    });

    it("can use a function to return more complex data", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );
      const items = list
        .children()
        .array((node) => node.nodeName + " " + node.textContent);
      expect(items).toEqual(["LI A", "LI B"]);
    });
  });
});
