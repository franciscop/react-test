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
    expect($hello.children().get(0).nodeName).toBe("BUTTON");
  });

  it("Ignores spaces", async () => {
    const $hello = $(
      <div>
        {" "}
        <button>Hello</button>{" "}
      </div>
    );
    expect($hello.children()).toHaveLength(1);
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
      .array()
      .map((node) => node.nodeName);
    expect(names).toEqual(["A", "UL"]);
  });

  it("Has the correct html with selector", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.children("button").get(0).nodeName).toBe("BUTTON");
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
      .array()
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
      .array()
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
      .array()
      .map((node) => node.nodeName);
    expect(names).toEqual(["BUTTON", "BUTTON"]);
  });

  describe("readme", () => {
    it("can select all list items", async () => {
      const list = $(
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );
      expect(list.children().text()).toBe("A");
      expect(list.children(":last-child").text()).toBe("B");
    });

    it("can get the children", () => {
      const List = () => (
        <ul>
          <li>A</li>
          <li>B</li>
        </ul>
      );

      // Find the text of each element
      const text = $(<List />)
        .children()
        .array((item) => item.textContent);

      expect(text).toEqual(["A", "B"]);
    });
  });
});
