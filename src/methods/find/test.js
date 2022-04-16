import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".find()", () => {
  it("will get tag that we want", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.find("button").first().nodeName).toBe("BUTTON");
  });

  it("can match every successor", async () => {
    const $hello = $(
      <div>
        <a>
          <button>Hello</button>
          <span>World</span>
        </a>
      </div>
    );
    const names = $hello
      .find("*")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["A", "BUTTON", "SPAN"]);
  });
});
