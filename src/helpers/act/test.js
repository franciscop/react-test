import React from "react";

import $, { act } from "../../";
import CountDown from "./CountDown";

const delay = (time) => new Promise((done) => setTimeout(done, time));

it("will countdown from 3 to 0", async () => {
  const down = $(<CountDown />);
  expect(down).toHaveText("3");
  await act(() => delay(1000));
  expect(down).toHaveText("Done!");
});
