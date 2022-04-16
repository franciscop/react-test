import React from "react";
import $ from "../../";
import "babel-polyfill";

describe(".change()", () => {
  it("can attach and click on children", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <input onChange={mock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.find("input").change("hello");
    expect(mock).toBeCalled();
  });

  it("has the right value", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <input onChange={mock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.find("input").change("hello");
    expect($test.find("input").get(0).value).toBe("hello");
    expect(mock.mock.calls[0][0].target.value).toBe("hello");
  });

  it("can change two inputs", async () => {
    const mock1 = jest.fn();
    const mock2 = jest.fn();
    const $test = $(
      <div>
        <input onChange={mock1} />
        <input onChange={mock2} />
      </div>
    );
    expect(mock1).not.toBeCalled();
    expect(mock2).not.toBeCalled();
    await $test.find("input:first-child").change("hello");
    await $test.find("input:last-child").change("bye");
    expect(mock1.mock.calls[0][0].target.value).toBe("hello");
    expect(mock2.mock.calls[0][0].target.value).toBe("bye");
  });

  it("works with uncontrolled inputs", async () => {
    const input = $(<input defaultValue="hello" />);
    expect(input).toHaveValue("hello");
    await input.change("Francisco");
    expect(input).toHaveValue("Francisco");
  });
});
