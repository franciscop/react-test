import React, { useEffect, useState } from "react";
import $ from "../../";
import "babel-polyfill";

const Updater = () => {
  const [text, setText] = useState("initial");
  useEffect(() => {
    setTimeout(() => setText("updated"), 1000);
  }, []);
  return <div>{text}</div>;
};

describe("delay", () => {
  it("works", async () => {
    const updater = $(<Updater />);
    expect(updater.text()).toBe("initial");
    await updater.delay(2000);
    expect(updater.text()).toBe("updated");
  });
});
