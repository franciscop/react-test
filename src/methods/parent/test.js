import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".parent()", () => {
  it("will get tag that we want", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );

    expect($hello.find("button").parent().first().nodeName).toBe("DIV");
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
    expect($hello.parent("li").first().nodeName).toEqual("UL");
  });

  it("Has the correct html with selector", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.parent("button").first().nodeName).toBe("DIV");
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
    expect($hello.parent("ul").first().nodeName).toEqual("DIV");
  });

  it("Can be chained", async () => {
    const $hello = $(
      <div>
        <p>
          <a>
            <button>Hello</button>
            <span>World</span>
          </a>
        </p>
      </div>
    );
    const names = $hello
      .parent("a")
      .find("button")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["BUTTON"]);
  });

  it("Can get parents of multiple nodes", async () => {
    const $hello = $(
      <div>
        <p>
          <a>
            <button>Hello</button>
            <span>World</span>
          </a>
        </p>
        <div>
          <a>
            <button>Hello</button>
            <span>World</span>
          </a>
        </div>
      </div>
    );
    const names = $hello
      .parent("a")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["P", "DIV"]);
  });
});
