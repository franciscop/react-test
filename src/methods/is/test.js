import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".is()", () => {
  it("returns true when empty", async () => {
    const hello = $(<div></div>);
    expect(hello.is()).toBe(true);
  });

  it("Has the correct html", async () => {
    const hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect(hello.is("div")).toBe(true);
    expect(hello.is("button")).not.toBe(true);
    expect(hello.find("button").is("button")).toBe(true);
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
