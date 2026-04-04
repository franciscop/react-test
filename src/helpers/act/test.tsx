import $, { act } from "../../";
import CountDown from "./CountDown";

import { vi } from "vitest";

it("will countdown from 3 to 0", async () => {
  vi.useFakeTimers();

  const down = $(<CountDown />);
  expect(down).toHaveText("3");

  await act(async () => {
    vi.advanceTimersByTime(1000);
  });

  expect(down).toHaveText("Done!");

  vi.useRealTimers();
});
