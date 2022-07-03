import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".is()", () => {
  it("returns true when empty", async () => {
    const hello = $(<div></div>);
    expect(hello.is()).toBe(true);
  });

  it("accepts CSS selectors", async () => {
    const hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect(hello.is("div")).toBe(true);
    expect(hello.is("button")).toBe(false);
    expect(hello.find("button").is("button")).toBe(true);
  });

  it("accepts a callback", async () => {
    const hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect(hello.is(() => true)).toBe(true);
    expect(hello.is(() => false)).toBe(false);
  });

  it("accepts a ReactTest instance", async () => {
    const hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect(hello.is(hello)).toBe(true);
  });

  it("accepts a ReactTest instance with multiple children", async () => {
    const hello = $(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>
    );
    const items = hello.children();
    expect(items.is(items)).toBe(true);
    expect(hello.is(items)).toBe(false);
  });

  describe("readme", () => {
    it("can properly match the button", () => {
      const button = $(<a className="button active">Click me</a>);

      expect(button.is("a")).toBe(true);
      expect(button.is(".active")).toBe(true);
      expect(button.is(".inactive")).not.toBe(true);
    });
  });
});
