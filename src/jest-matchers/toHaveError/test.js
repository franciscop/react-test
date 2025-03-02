import React from "react";
import $ from "../../";
import "../index.js";

describe(".toHaveError()", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    console.error.mockRestore();
  });

  it("works for a simple case", () => {
    function MyComponent() {
      throw new Error("hello world");
    }
    const $button = $(<MyComponent />);
    expect($button).toHaveError();
    expect($button).toHaveError("hello world");
  });

  it("can negate errors", () => {
    function Plain() {
      return <div>Hello</div>;
    }
    function MyComponent() {
      throw new Error("hello world");
    }
    expect(<Plain />).not.toHaveError();
    expect(<MyComponent />).not.toHaveError("bye");
  });
});
