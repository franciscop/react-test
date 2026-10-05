import { act, type ReactNode } from "react";
import { createContainer } from "./render";

const render = (component: ReactNode) => {
  const container = createContainer();
  container.render(component);
  return [...container.childNodes];
};

describe("render", () => {
  it("will render plain strings", () => {
    const html = render("Hello");
    expect(html[0].textContent).toEqual("Hello");
  });

  it("will render a string fragment", () => {
    const html = render(<>Hello</>);
    expect(html[0].textContent).toEqual("Hello");
  });

  it("can deal with errors", () => {
    const MyDemo = () => {
      throw new Error("hello");
    };
    const html = () => render(<MyDemo />);
    expect(html).toThrow("hello");
  });

  it("can render a plain Div", () => {
    const html = render(<div>Abc</div>);
    expect((html[0] as HTMLElement).outerHTML).toEqual(`<div>Abc</div>`);
    expect(html[0].nodeName).toBe("DIV");
  });

  it("can render a list", () => {
    const html = render(
      <ul>
        <li>A</li>
        <li>B</li>
      </ul>,
    );
    expect((html[0] as HTMLElement).outerHTML).toEqual(
      `<ul><li>A</li><li>B</li></ul>`,
    );
    expect(html[0].nodeName).toBe("UL");
    expect((html[0] as HTMLElement).children).toHaveLength(2);
    expect((html[0] as HTMLElement).children[0].nodeName).toBe("LI");
  });
});

describe("createContainer", () => {
  it("removes its window error listener on unmount", () => {
    const add = vi.spyOn(window, "addEventListener");
    const remove = vi.spyOn(window, "removeEventListener");
    const container = createContainer();
    container.render(<div>Hello</div>);
    const listener = add.mock.calls.find(([type]) => type === "error")?.[1];
    act(() => container.root.unmount());
    expect(listener).toBeDefined();
    expect(remove).toHaveBeenCalledWith("error", listener);
    add.mockRestore();
    remove.mockRestore();
  });
});
