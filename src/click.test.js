import React, { useState } from "react";
import $ from "./";
import "babel-polyfill";

describe(".click()", () => {
  it("can attach and click on children", () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div onClick={mock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    const ret = $test.click("div");
    expect(mock).toBeCalled();
  });

  it("returns a promise", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div
          onClick={async e => {
            await Promise.resolve();
            mock();
          }}
        />
      </div>
    );
    expect(mock).not.toBeCalled();
    const ret = $test.click("div");
    expect(mock).not.toBeCalled();
    await ret;
    expect(mock).toBeCalled();
  });

  it("can click two children", () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const $test = $(
      <div>
        <div onClick={mock1} />
        <div onClick={mock2} />
      </div>
    );
    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
    $test.click("div");
    expect(mock1).toBeCalled();
    expect(mock2).toBeCalled();
  });

  it("can click only on the first one", () => {
    const mock = jest.fn();
    const badmock = jest.fn();
    const $test = $(
      <div>
        <span onClick={mock} />
        <div onClick={badmock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    $test.click("span");
    expect(mock).toBeCalled();
    expect(badmock).not.toBeCalled();
  });

  it("works with async and no wait", async () => {
    const mock = jest.fn();
    const $test = $(
      <div onClick={async () => mock()}>
        <div>Hi</div>
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.click("div");
    expect(mock).toBeCalled();
  });

  it("will bubble up", () => {
    const mock = jest.fn();
    const $test = $(
      <div onClick={mock}>
        <div>Hi</div>
      </div>
    );
    expect(mock).not.toBeCalled();
    $test.click("div");
    expect(mock).toBeCalled();
  });

  it("won't throw when clicking on unfound children", () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div onClick={mock}>Hi</div>
      </div>
    );
    expect(mock).not.toBeCalled();
    $test.click("a");
    expect(mock).not.toBeCalled();
    $test.click("div");
    expect(mock).toBeCalled();
  });

  it("won't throw when clicking on children with no props", () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div onClick={mock}>Hi</div>
      </div>
    );
    expect(mock).not.toBeCalled();
    $test.click();
    expect(mock).not.toBeCalled();
    $test.click("div");
    expect(mock).toBeCalled();
  });

  it("won't throw when clicking on children with no onClick", () => {
    const $test = $(
      <div>
        <div>Hi</div>
      </div>
    );
    $test.click();
    $test.click("div");
  });
});
