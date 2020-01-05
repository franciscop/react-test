import React, { useState } from "react";
import $ from "./";
import "babel-polyfill";

const $list = $(
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
);

describe(".last()", () => {
  it("can render to HTML", async () => {
    expect($list.last().nodeName).toBe("UL");
  });

  it("can render to HTML", async () => {
    expect($list.find("li").last().textContent).toEqual("C");
  });
});
