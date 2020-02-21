import React, { useState } from "react";
import $ from "../../";
import "babel-polyfill";

describe(".html()", () => {
  it("can get the plain html", () => {
    const $hello = $(<button>Hello</button>);
    expect($hello.text()).toBe(`Hello`);
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
});
