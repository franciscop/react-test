import $ from "react-test";
import Search from "./Search";

describe("Search", () => {
  it("fires the form onChange", async () => {
    const $search = $(<Search />);
    await $search.find("input").change("kiwi");
    expect($search.find("input")).toHaveValue("kiwi");
    expect($search.find("p")).toHaveText("kiwi");
  });

  it("fails on an empty selection", () => {
    const $search = $(<Search />);
    expect(() => expect($search.find("textarea")).toHaveValue(true)).toThrow(
      "the selection is empty",
    );
  });
});
