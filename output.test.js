import React, { useEffect } from "react";
import $ from "./index.js";
import "babel-polyfill";

describe("output", () => {
  it("can use hooks", () => {
    const CompWithHook = () => {
      useEffect(() => {
        // Nothing going on here
      }, []);
      return <div>Hi</div>;
    };
    const $hooked = $(<CompWithHook />);
    expect($hooked.html()).toBe(`<div>Hi</div>`);
  });
});
