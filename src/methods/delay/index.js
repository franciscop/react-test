import $ from "../constructor";
import { act } from "react-dom/test-utils";

const delay = (time) => new Promise((done) => setTimeout(done, time));

$.prototype.delay = async function (time) {
  await act(() => delay(time));
};
