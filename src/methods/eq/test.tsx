import $ from "../../";

const List = () => (
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
  </ul>
);

describe(".eq()", () => {
  it("can get any element", () => {
    const items = $(<List />).children();
    expect(items.eq(0)).toHaveText("A");
    expect(items.eq(1)).toHaveText("B");
    expect(items.eq(-1)).toHaveText("D");
    expect(items.eq(-2)).toHaveText("C");
  });

  it("defaults to the first element", () => {
    expect(
      $(<List />)
        .children()
        .eq(),
    ).toHaveText("A");
  });

  it("keeps the node wrapped so it can be chained", () => {
    const item = $(<List />)
      .children()
      .eq(1);
    expect(item).toHaveLength(1);
    expect(item.text()).toBe("B");
    expect(item.is("li")).toBe(true);
    expect(item.parent()).toHaveLength(1);
  });

  it("works with a fragment as well", () => {
    const list = $(
      <>
        <div>A</div>
        <div>B</div>
      </>,
    );
    expect(list.eq(0)).toHaveText("A");
    expect(list.eq(-1)).toHaveText("B");
  });

  it("returns an empty instance when out of bounds", () => {
    const items = $(<List />).children();
    expect(items.eq(5)).toHaveLength(0);
    expect(items.eq(-5)).toHaveLength(0);
    expect(
      $(<div>A</div>)
        .find("li")
        .eq(),
    ).toHaveLength(0);
  });
});
