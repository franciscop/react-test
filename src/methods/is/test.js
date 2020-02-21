import React, { useState } from "react";
import $ from "../../";
import "babel-polyfill";

describe(".is()", () => {
  it("Has the correct html", async () => {
    const $hello = $(
      <div>
        <button>Hello</button>
      </div>
    );
    expect($hello.is("div")).toBe(true);
    expect($hello.is("button")).not.toBe(true);
    expect($hello.find("button").is("button")).toBe(true);
  });
});
