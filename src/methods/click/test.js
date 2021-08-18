import React, { useEffect } from "react";
import $ from "../../";
import "babel-polyfill";

const delay = time => new Promise(done => setTimeout(done, time));

describe(".click()", () => {
  it("can attach and click on children", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div onClick={mock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.find("div").click();
    expect(mock).toBeCalled();
  });

  it("returns a promise", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div
          onClick={async () => {
            await delay(100);
            mock();
          }}
        />
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.click("div", 200);
    expect(mock).toBeCalled();
  });

  it("can click two children", async () => {
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
    await $test.click("div");
    expect(mock1).toBeCalled();
    expect(mock2).toBeCalled();
  });

  it("can click only on the first one", async () => {
    const mock = jest.fn();
    const badmock = jest.fn();
    const $test = $(
      <div>
        <span onClick={mock} />
        <div onClick={badmock} />
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.click("span");
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

  it("works with async and waiting", async () => {
    const mock = jest.fn();
    const $test = $(
      <div
        onClick={async () => {
          await delay(100);
          mock();
        }}
      >
        Hi
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.click();
    expect(mock).toBeCalled();
  });

  const Button = ({ run, ...props }) => <div onClick={run} {...props} />;

  it("works with different prop names", async () => {
    const mock = jest.fn();
    const $test = $(
      <Button
        run={async () => {
          await delay(100);
          mock();
        }}
      >
        Hi
      </Button>
    );
    expect(mock).not.toBeCalled();
    await $test.click();
    expect(mock).toBeCalled();
  });

  it("will bubble up", async () => {
    const mock = jest.fn();
    const $test = $(
      <div onClick={mock}>
        <div>Hi</div>
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.click("div");
    expect(mock).toBeCalled();
  });

  it("won't throw when clicking on unfound children", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div onClick={mock}>Hi</div>
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.click("a");
    expect(mock).not.toBeCalled();
    await $test.click("div");
    expect(mock).toBeCalled();
  });

  it("won't throw when clicking on children with no props", async () => {
    const mock = jest.fn();
    const $test = $(
      <div>
        <div onClick={mock}>Hi</div>
      </div>
    );
    expect(mock).not.toBeCalled();
    await $test.click();
    expect(mock).not.toBeCalled();
    await $test.click("div");
    expect(mock).toBeCalled();
  });

  it("won't throw when clicking on children with no onClick", async () => {
    const $test = $(
      <div>
        <div>Hi</div>
      </div>
    );
    await $test.click();
    await $test.click("div");
  });

  it("works with native links", async () => {
    const mock = jest.fn();
    const Page = () => {
      useEffect(() => {
        document.addEventListener("click", () => {
          mock();
        });
        return () => document.removeEventListener("click", mock);
      }, []);

      return (
        <div>
          <a>Click me</a>
        </div>
      );
    };

    const $test = $(<Page />);
    expect(mock).not.toBeCalled();
    await $test.click("a");
    expect(mock).toBeCalled();
  });
});
