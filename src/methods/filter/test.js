import React from "react";
import $ from "../../";
import "babel-polyfill";

const list = $(
  <ul>
    <li className="foo">A</li>
    <li className="bar">B</li>
    <li className="foo">
      <a href="#" className="bar">
        Link
      </a>
    </li>
  </ul>
).find("li");

describe(".filter()", () => {
  it("returns only nodes which matched the selector", async () => {
    expect(list.filter(".foo").nodes).toHaveLength(2);
  });

  it("only checks current nodes, not their children", async () => {
    expect(list.filter(".bar").nodes).toHaveLength(1);
  });

  it("returns empty if no matching nodes", async () => {
    expect(list.filter(".baz").nodes).toHaveLength(0);
  });

  it("returns all nodes if no selector is provided", async () => {
    expect(list.filter().nodes).toHaveLength(3);
  });

  it("can filter with a callback and the node", async () => {
    const hasClass = (node, name) => node.classList.contains(name);
    expect(list.filter((node) => hasClass(node, "foo")).nodes).toHaveLength(2);
    expect(list.filter((node) => hasClass(node, "bar")).nodes).toHaveLength(1);
    expect(list.filter((node) => hasClass(node, "baz")).nodes).toHaveLength(0);
  });

  it("can filter with a callback and the index", async () => {
    expect(list.filter((node, i) => i === 0).text()).toBe("A");
    expect(list.filter((node, i) => i === 1).text()).toBe("B");
    expect(list.filter((node, i) => i === 2).text()).toBe("Link");
  });

  describe("readme", () => {
    it("can get just the users", () => {
      const list = $(
        <ul>
          <li className="user">John</li>
          <li className="group">Ibiza</li>
          <li className="user">Sarah</li>
        </ul>
      );
      const people = list.children().filter(".user");
      expect(people.toArray((node) => node.textContent)).toEqual([
        "John",
        "Sarah",
      ]);
    });
  });
});
