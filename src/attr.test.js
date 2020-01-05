import React, { useState } from "react";
import $ from "./";
import "babel-polyfill";

describe("attr", () => {
  it("Has the correct html", async () => {
    const Hello = () => (
      <div className="test" disabled>
        Hello
      </div>
    );
    const $hello = $(<Hello />);
    expect($hello.attr("class")).toBe("test");
    expect($hello.attr("disabled")).toBe("");

    // We test attributes, not properties
    expect($hello.attr("className")).toBe(null);
  });
});
