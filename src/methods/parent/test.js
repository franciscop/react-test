import React from "react";
import $ from "../../";
import "babel-polyfill";

const $list = $(
  <ul className="boo">
    <li className="foo">A</li>
    <li className="bar">
      <a href="#" className="baz">
        Link 1
      </a>
    </li>
    <li className="foo">
      <a href="#" className="bar">
        Link 2
      </a>
    </li>
  </ul>
);

describe(".parent()", () => {
  it("returns only the direct parent of a single node", async () => {
    expect($list.find(".baz").parent().nodes).toHaveLength(1);
  });

  it("returns only one parent if given multiple children of the same parent", async () => {
    expect($list.find("li").parent().nodes).toHaveLength(1);
  });

  it("returns multiple parents of multiple nodes", async () => {
    expect($list.find("a").parent().nodes).toHaveLength(2);
    expect($list.find("a").parent().get(0)).toHaveClass("bar");
  });

  it("returns empty if no parent", async () => {
    expect($list.find(".boo").parent().nodes).toHaveLength(0);
  });

  describe("readme", () => {
    it("can go down and up again", () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );
      const items = list.children(); // <li>A</li>, <li>B</li>
      const listB = items.parent(); // <ul>...</ul>
      expect(listB.html()).toEqual(list.html());
    });
  });
});
