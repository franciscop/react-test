import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".html()", () => {
  it("can be called with no nodes", () => {
    const hello = $(<button>Hello</button>);
    expect(hello.find("li").html()).toBe("");
  });

  it("can get the plain html", () => {
    const hello = $(<button>Hello</button>);
    expect(hello.html()).toBe(`<button>Hello</button>`);
  });

  it("can get nested children", () => {
    const hello = $(
      <div className="hello">
        <button>Hello</button>
      </div>
    );
    expect(hello.html()).toBe(
      `<div class="hello"><button>Hello</button></div>`
    );
  });

  it("only gets the first child", () => {
    const $hello = $(
      <div className="hello">
        <button>Hello</button>
        <button>World</button>
      </div>
    );
    expect($hello.find("button").html()).toBe(`<button>Hello</button>`);
  });

  it("can get a string", () => {
    const $hello = $(<>Hello</>);
    expect($hello.text()).toBe(`Hello`);
  });

  describe("readme", () => {
    it("can extract the plain html", () => {
      const card = $(<div className="card">Hello</div>);
      expect(card.html()).toBe(`<div class="card">Hello</div>`);
    });
  });
});
