import React, { useState } from "react";
import $ from "./";
import "babel-polyfill";

const Counter = () => {
  return (
    <div className="test" disabled>
      Hello
    </div>
  );
};

it("Will increment the counter", async () => {
  const $counter = $(<Counter />);
  expect($counter.html()).toEqual(`<div class="test" disabled>0</div>`);
});
