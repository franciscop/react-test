import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".parent()", () => {
  it("Has the correct tag of multyple children", async () => {
    const $base = $(
      <>
        <div>
          <a>Hello</a>
        </div>
        <span>
          <a>World</a>
        </span>
      </>
    );
    expect($base.find("a").parent("div").nodeName).toBe("DIV");
  });

  it("Has the correct nested html without selector", async () => {
    const $hello = $(
      <div>
        <a>
          <button>Hello</button>
          <span>World</span>
        </a>
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      </div>
    );
    expect($hello.find("li").parent().nodeName).toEqual("UL");
  });

  it("Has the correct html with selector", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.parent("button").nodeName).toBe("DIV");
  });

  it("Has the correct nested html with selector", async () => {
    const $hello = $(
      <div>
        <a>
          <button>Hello</button>
          <span>World</span>
        </a>
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      </div>
    );
    expect($hello.parent("ul").nodeName).toEqual("DIV");
  });
});
