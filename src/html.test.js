import React, { useState } from "react";
import $ from "./";
import "babel-polyfill";

describe(".html()", () => {
  it("can attach and click on children", () => {
    const $hello = $(
      <div className="hello">
        <button>Hello</button>
      </div>
    );
    expect($hello.html()).toBe(
      `<div class="hello"><button>Hello</button></div>`
    );
  });
});
