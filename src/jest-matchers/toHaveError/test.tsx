import React from "react";
import $ from "../../";
import "../index";

describe(".toHaveError()", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterAll(() => {
    (console.error as jest.MockedFunction<typeof console.error>).mockRestore();
  });

  it("works for a simple case", () => {
    function MyComponent(): React.ReactElement {
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
    function MyComponent(): React.ReactElement {
      throw new Error("hello world");
    }
    expect(<Plain />).not.toHaveError();
    expect(<MyComponent />).not.toHaveError("bye");
  });
});
