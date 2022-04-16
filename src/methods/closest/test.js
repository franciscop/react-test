import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".closest()", () => {
  it("Has the correct html when match itself", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.closest("div").first().nodeName).toBe("DIV");
  });

  it("Will default to self", async () => {
    const $hello = $(<button>Hello</button>);
    expect($hello.closest().first().nodeName).toBe("BUTTON");
  });

  it("Will have no nodes when no match is found", async () => {
    const $hello = $(<button>Hello</button>);
    expect($hello.closest("a").toArray()).toEqual([]);
  });

  it("Has the correct html when match parent", async () => {
    const $hello = $(
      <div>
        <a>
          <button>Hello</button>
          <span>World</span>
        </a>
      </div>
    );
    const names = $hello.find("button").closest("a").first().nodeName;
    expect(names).toBe("A");
  });

  it("Has the correct html when match parent from multiple children", async () => {
    const $hello = $(
      <div>
        <ul>
          <li>Hello</li>
          <li>World</li>
        </ul>
      </div>
    );
    const names = $hello.find("li").closest("ul").first().nodeName;
    expect(names).toBe("UL");
  });

  it("Has the correct html when match multiple parents from multiple children", async () => {
    const List = () => (
      <ul>
        <li>
          <a>Hello</a>
        </li>
        <li>
          <a>World</a>
        </li>
      </ul>
    );

    // This should return both of the <li>s
    const names = $(<List />)
      .find("a")
      .closest("li")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["LI", "LI"]);
  });

  it("Has the correct html when match single parent from multiple children", async () => {
    const List = () => (
      <div>
        <ul>
          <li>
            <a>Hello</a>
          </li>
          <li>
            <a>World</a>
          </li>
        </ul>
      </div>
    );

    // This should return both of the <li>s
    const names = $(<List />)
      .find("a")
      .closest("ul")
      .toArray()
      .map((node) => node.nodeName);
    expect(names).toEqual(["UL"]);
  });
});
