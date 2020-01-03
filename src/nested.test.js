import React, { useState } from "react";
import $ from "./";
import "babel-polyfill";

const Counter = () => {
  const [counter, setCounter] = useState(0);
  const increment = () => setCounter(counter + 1);
  return (
    <div>
      <div className="counter" onClick={increment}>
        {counter}
      </div>
    </div>
  );
};

it("Will increment the counter", async () => {
  const $counter = $(<Counter />);
  expect($counter.html()).toEqual("<div><div>0</div></div>");
  await $counter.click();
  expect($counter.html()).toEqual("<div><div>0</div></div>");
  await $counter.find(".couner").click();
  expect($counter.html()).toEqual("<div><div>1</div></div>");
  await $counter.click();
  expect($counter.html()).toEqual("<div><div>1</div></div>");
});
