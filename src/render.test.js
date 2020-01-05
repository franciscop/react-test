import React, { useState } from "react";
import render from "./render";
import "babel-polyfill";

describe("render", () => {
  it("empty returns an empty array", () => {
    const html = render();
    expect(html).toEqual([]);
  });

  it("will skip plain strings", () => {
    const html = render("Hello");
    expect(html).toEqual([]);
  });

  it("can render a plain Div", () => {
    const html = render(<div>Abc</div>);
    expect(html[0].outerHTML).toEqual(`<div>Abc</div>`);
    expect(html[0].nodeName).toBe("DIV");
  });

  it("can be double rendered", () => {
    const html = render(render(<div>Abc</div>));
    expect(html[0].outerHTML).toEqual(`<div>Abc</div>`);
    expect(html[0].nodeName).toBe("DIV");
  });

  it("can render a list", () => {
    const html = render(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>
    );
    expect(html[0].outerHTML).toEqual(`<ul><li>A</li><li>B</li></ul>`);
    expect(html[0].nodeName).toBe("UL");
    expect(html[0].children.length).toBe(2);
    expect(html[0].children[0].nodeName).toBe("LI");
  });
});
