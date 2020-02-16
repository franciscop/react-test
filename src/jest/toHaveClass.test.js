import React from "react";
import $ from "../../";
import "./index.js";

const $div = $(<div className="hello world" />);
const div = $(<div className="hello world" />).nodes[0];

const withError = cb => {
  try {
    cb();
  } catch (error) {
    return error.message;
  }
  throw new Error("Did not throw");
};

describe("toHaveClass", () => {
  it("works for a simple case", () => {
    expect(div).toHaveClass("hello");
    expect(div).not.toHaveClass("banana");
    expect($div).toHaveClass("hello");
    expect($div).not.toHaveClass("banana");
  });

  it("requires an HTML element", () => {
    const message = withError(() => {
      expect(null).toHaveClass("banana");
    });
    console.log(message);
  });

  it("requires a class if it's not found", () => {
    const message = withError(() => {
      expect(div).toHaveClass("banana");
    });
    expect(message).toBe(
      'Expected <div class="hello world"> to include class "banana"'
    );
  });

  it("only requires the class that is not found", () => {
    const message = withError(() => {
      expect(div).toHaveClass("hello", "banana");
    });
    expect(message).toBe(
      'Expected <div class="hello world"> to include class "banana"'
    );
  });

  it("can pluralize class names", () => {
    const message = withError(() => {
      expect(div).toHaveClass("potato", "banana");
    });
    expect(message).toBe(
      'Expected <div class="hello world"> to include classes "potato", "banana"'
    );
  });

  it("fails if it's found when not expected", () => {
    const message = withError(() => {
      expect(div).not.toHaveClass("hello");
    });
    expect(message).toBe(
      'Expected <div class="hello world"> not to include class "hello"'
    );
  });

  it("only fails with the class that is found", () => {
    const message = withError(() => {
      expect(div).not.toHaveClass("hello", "banana");
    });
    expect(message).toBe(
      'Expected <div class="hello world"> not to include class "hello"'
    );
  });

  it("pluralizes if there's multiple fails", () => {
    const message = withError(() => {
      expect(div).not.toHaveClass("hello", "world");
    });
    expect(message).toBe(
      'Expected <div class="hello world"> not to include classes "hello", "world"'
    );
  });
});
