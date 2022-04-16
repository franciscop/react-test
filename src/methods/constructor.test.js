import React, { useEffect } from "react";
import $ from "../";
import "babel-polyfill";

describe("Iterator", () => {
  it("has the correct names", () => {
    const $button = $(<button>Hello</button>);
    expect($button.constructor.name).toBe("ReactTest");
  });

  it("can convert to an array with destructuring", () => {
    const html = $(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>
    );
    expect([...html.find("li")]).toHaveLength(2);
    expect([...html.find("li")].map((el) => el.nodeName)).toEqual(["LI", "LI"]);
  });

  it("can iterate the values with for...of", () => {
    const html = $(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>
    );
    let total = 0;
    for (let item of html.find("li")) {
      expect(item.nodeName).toBe("LI");
      total++;
    }
    expect(total).toBe(2);
  });

  it("can wrap the iterable", () => {
    const html = $(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>
    );
    let total = 0;
    for (let item of html.find("li")) {
      expect($(item).get(0).nodeName).toBe("LI");
      total++;
    }
    expect(total).toBe(2);
  });

  it("can use hooks", () => {
    const CompWithHook = () => {
      useEffect(() => {
        // Nothing going on here
      }, []);
      return <div>Hi</div>;
    };
    const $hooked = $(<CompWithHook />);
    expect($hooked.html()).toBe(`<div>Hi</div>`);
  });

  it("can be double rendered", () => {
    const html = $(<div>Abc</div>);
    expect(html.nodes[0].outerHTML).toEqual(`<div>Abc</div>`);
    expect(html.nodes[0].nodeName).toBe("DIV");
  });
});
