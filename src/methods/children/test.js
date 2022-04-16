import React from "react";
import $ from "../../";
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
    const names = $hello
      .children()
      .toArray()
      .map((node) => node.nodeName);
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
    const names = $hello
      .children("ul")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["UL"]);
  });

  it("Can be chained", async () => {
    const $hello = $(
      <div>
        <a>
          <button>Hello</button>
          <span>World</span>
        </a>
      </div>
    );
    const names = $hello
      .children("a")
      .find("button")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["BUTTON"]);
  });

  it("Can get children of multiple nodes", async () => {
    const $hello = $(
      <div>
        <p>
          <a>
            <button>Hello</button>
            <span>World</span>
          </a>
        </p>
        <p>
          <a>
            <button>Hello</button>
            <span>World</span>
          </a>
        </p>
      </div>
    );
    const names = $hello
      .find("p")
      .children("a")
      .find("button")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["BUTTON", "BUTTON"]);
  });
});
