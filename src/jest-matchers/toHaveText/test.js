import React from "react";
import $ from "../../";
import "../index.js";

describe(".toHaveText()", () => {
  it("requires an HTML element", () => {
    const msg = "expect() should receive an HTMLElement or React Test instance";
    expect(() => expect(null).toHaveText("banana")).toThrow(msg);
    expect(() => expect("abc").toHaveText("banana")).toThrow(msg);
  });

  it("works for a simple case", () => {
    expect(<div>Hello</div>).toHaveText("Hello");
  });

  it("rejects in the simple case", () => {
    expect(() => expect(<div>banana</div>).toHaveText("apple")).toThrow(
      'Expected <div> to have text "apple" but it received "banana"'
    );
  });

  it("normalizes the whitespace", () => {
    const text = $(
      <div>
        Hello <br /> world!
      </div>
    );
    expect(text).toHaveText("Hello world!");
  });

  it("can be negated", () => {
    expect(<div>Hello</div>).not.toHaveText("Hi");
  });

  it("rejects with the negation", () => {
    expect(() => expect(<div>banana</div>).not.toHaveText("banana")).toThrow(
      'Expected <div> not to have the text "banana"'
    );
  });
});
