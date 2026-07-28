import $ from "../../";

const List = () => (
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
);

describe(".last()", () => {
  it("gets the last of the matched nodes", () => {
    const items = $(<List />).children();
    expect(items.last()).toHaveText("C");
    expect(items.last()).toHaveLength(1);
  });

  it("can be chained", () => {
    expect(
      $(<List />)
        .children()
        .last()
        .parent()
        .children(),
    ).toHaveLength(3);
  });

  it("returns an empty instance when there are no nodes", () => {
    expect(
      $(<div>A</div>)
        .find("li")
        .last(),
    ).toHaveLength(0);
  });
});
