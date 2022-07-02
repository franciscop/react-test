import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".html()", () => {
  it("can be called with no nodes", () => {
    const hello = $(<button>Hello</button>);
    expect(hello.find("li").text()).toBe("");
  });

  it("can get the plain text", () => {
    const $hello = $(<button>Hello</button>);
    expect($hello.text()).toBe("Hello");
  });

  it("can get nested children", () => {
    const $hello = $(
      <div className="hello">
        <button>Hello</button>
      </div>
    );
    expect($hello.text()).toBe(`Hello`);
  });

  it("only gets the first child", () => {
    const $hello = $(
      <div className="hello">
        <button>Hello</button>
        <button>World</button>
      </div>
    );
    expect($hello.find("button").text()).toBe(`Hello`);
  });

  describe("readme", () => {
    it("can get the simple text", () => {
      const greeting = $(
        <div>
          Hello <br /> world
        </div>
      );
      expect(greeting.text()).toBe("Hello world");
    });
  });
});
