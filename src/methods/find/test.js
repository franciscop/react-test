import React, { useState } from "react";
import $ from "../../";
import "babel-polyfill";

describe(".find()", () => {
  it("Has the correct html", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.find("button").first().nodeName).toBe("BUTTON");
  });

  it("Has the correct html", async () => {
    const $hello = $(
      <div>
        <a>
          <button>Hello</button>
          <span>World</span>
        </a>
      </div>
    );
    const names = $hello.find("*").nodes.map(node => node.nodeName);
    expect(names).toEqual(["A", "BUTTON", "SPAN"]);
  });
});
