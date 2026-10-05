import { useEffect, useState } from "react";
import $, { until } from "../../";

describe(".contains()", () => {
  const $list = $(
    <ul>
      <li>Include</li>
      <li>Exclude</li>
      <li>
        <b>Save</b> changes
      </li>
    </ul>,
  );

  it("keeps the nodes that contain the text", () => {
    expect($list.find("li").contains("clude").length).toBe(2);
    expect($list.find("li").contains("Exclude")).toHaveText("Exclude");
  });

  it("matches the text the way .text() reads it", () => {
    const $item = $list.find("li").contains("Save changes");
    expect($item.length).toBe(1);
    expect($item.text()).toBe("Save changes");
  });

  it("matches exactly with a regex", () => {
    expect($list.find("li").contains(/^Include$/)).toHaveText("Include");
    expect($list.find("li").contains(/^clude$/).length).toBe(0);
  });

  it("works with regexes that use the g flag", () => {
    const re = /clude/g;
    expect($list.find("li").contains(re).length).toBe(2);
    expect($list.find("li").contains(re).length).toBe(2);
  });

  it("includes the ancestors that contain the text", () => {
    expect($list.find("*").contains("Save").length).toBe(2);
  });

  it("is empty when nothing matches", () => {
    expect($list.find("li").contains("Nope").length).toBe(0);
  });

  it("can be clicked", async () => {
    const Picker = () => {
      const [picked, setPicked] = useState("");
      return (
        <div>
          <button onClick={() => setPicked("A")}>Pick A</button>
          <button onClick={() => setPicked("B")}>Pick B</button>
          <p>{picked}</p>
        </div>
      );
    };
    const $picker = $(<Picker />);
    await $picker.find("button").contains("Pick B").click();
    expect($picker.find("p")).toHaveText("B");
  });

  it("can wait with until()", async () => {
    const Late = () => {
      const [text, setText] = useState("Loading");
      useEffect(() => {
        setTimeout(() => setText("Loaded"), 20);
      }, []);
      return <p>{text}</p>;
    };
    const $late = $(<Late />);
    await until($late).contains("Loaded");
    expect($late).toHaveText("Loaded");
  });
});
