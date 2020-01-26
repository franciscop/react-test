import React, { useState } from "react";
import $ from ".";
import "babel-polyfill";

describe(".children()", () => {
  it("Has the correct html without selector", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.children().first().nodeName).toBe("BUTTON");
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
    const names = $hello.children().map(node => node.nodeName);
    expect(names).toEqual(["A", "UL"]);
  });

  it("Has the correct html with selector", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.children("button").first().nodeName).toBe("BUTTON");
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
    const names = $hello.children("ul").map(node => node.nodeName);
    expect(names).toEqual(["UL"]);
  });
});
