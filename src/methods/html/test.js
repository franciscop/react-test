import React, { useState } from "react";
import $ from "../../";
import "babel-polyfill";

describe(".html()", () => {
  it("can get the plain html", () => {
    const $hello = $(<button>Hello</button>);
    expect($hello.html()).toBe(`<button>Hello</button>`);
  });

  it("can get nested children", () => {
    const $hello = $(
      <div className="hello">
        <button>Hello</button>
      </div>
    );
    expect($hello.html()).toBe(
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

  it.skip("can get a string", () => {
    const $hello = $(<>Hello</>);
    expect($hello.html()).toBe(`Hello`);
  });
});
