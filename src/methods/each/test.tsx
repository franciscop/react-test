import React from "react";
import $ from "../../";

const list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
);

const items = list.children();

describe(".each()", () => {
  it("can be called empty", () => {
    expect(list.each()).toBe(list);
  });

  it("can be called with a simple extractor", () => {
    const texts: string[] = [];
    list.children().each((node) => texts.push(node.textContent!));
    expect(texts).toEqual(["A", "B", "C"]);
  });

  it("receives the right parameters", () => {
    let params: [Node, number, Node[]] | undefined;
    items.each((node, index, arr) => {
      if (index === 0) {
        params = [node, index, arr];
      }
    });
    expect(params![0].textContent).toBe(items.get(0)!.textContent);
    expect(params![1]).toBe(0);
    expect(params![2]).toHaveLength(items.length);
  });

  describe("readme", () => {
    it("can iterate over the items", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
          <li>C</li>
        </ul>
      );
      const texts: string[] = [];
      const out = list.find("li").each((node) => texts.push(node.textContent!));
      expect(texts).toEqual(["A", "B", "C"]);
      expect(out.get()!.textContent).toBe("A");
    });
  });
});
