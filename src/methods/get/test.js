import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".get()", () => {
  it("can get any element", () => {
    const list = $(
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
        <li>D</li>
      </ul>
    );
    expect(list.find("li").get(0)).toHaveText("A");
    expect(list.find("li").get(1)).toHaveText("B");
    expect(list.find("li").get(-1)).toHaveText("D");
    expect(list.find("li").get(-2)).toHaveText("C");
    expect(list.find("li").get(-5)).toHaveText("D");
    expect(list.find("li").get(-9)).toHaveText("D");
  });
  it("works with a fragment as well", () => {
    const list = $(
      <>
        <div>A</div>
        <div>B</div>
        <div>C</div>
        <div>D</div>
      </>
    );
    expect(list.get(0)).toHaveText("A");
    expect(list.get(1)).toHaveText("B");
    expect(list.get(-1)).toHaveText("D");
    expect(list.get(-2)).toHaveText("C");
    expect(list.get(-5)).toHaveText("D");
    expect(list.get(-9)).toHaveText("D");
  });

  it("returns null when not found", () => {
    const nolist = $(<div>A</div>);
    expect(nolist.find("li").get()).toBe(null);
  });
});
