import $ from "../../";

const List = () => (
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
);

describe(".first()", () => {
  it("gets the first of the matched nodes", () => {
    const items = $(<List />).children();
    expect(items.first()).toHaveText("A");
    expect(items.first()).toHaveLength(1);
  });

  it("can be chained", () => {
    expect(
      $(<List />)
        .children()
        .first()
        .parent()
        .children(),
    ).toHaveLength(3);
  });

  it("returns an empty instance when there are no nodes", () => {
    expect(
      $(<div>A</div>)
        .find("li")
        .first(),
    ).toHaveLength(0);
  });
});
