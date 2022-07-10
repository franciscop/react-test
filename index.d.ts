import React from 'react';
interface Events {
    [key: string]: Array<EventListenerOrEventListenerObject>;
}
declare type callback = ((node: Element, i: number) => Element | any);
declare class ReactTest {
    nodes: Array<Element>;
    events: Events;
    length: Number;
    click: Function;
    closest: (selector: string) => ReactTest;
    data: Function;
    delay: Function;
    each: Function;
    filter: (selector?: string) => ReactTest;
    find: (selector?: string) => ReactTest;
    get: Function;
    html: Function;
    is: (selector?: string) => boolean;
    map: Function;
    not: (selector?: string) => ReactTest;
    parent: (selector?: string) => ReactTest;
    siblings: (selector?: string) => ReactTest;
    submit: Function;
    text: Function;
    trigger: Function;
    type: Function;
    constructor(component: React.ReactNode, ctx?: any);
    /**
     * Get all of the matched nodes as a plain array. Optionally extract data of each ndoe either with a key used as an prop, or with a callback:
     *
     * ```js
     * const list = $(<List />).children();
     * list.array();  // [<li>A</li>, <li>B</li>, <li>C</li>]
     * list.array("nodeName");  // ["LI", "LI", "LI"]
     * list.array(node => node.innerText);  // ["A", "B", "C"]
     * ```
     *
     * **[→ Full .array() Docs](https://react-test.dev/documentation#array)**
     */
    array(extract?: string | callback): Array<any>;
    /**
     * Read the attribute value of the first node and return its value, or null if there's no node or attribute:
     *
     * ```js
     * const input = $(<input name="email" disabled />);
     * expect(input.attr("name")).toBe("email");
     * expect(input.attr("disabled")).toBe("");
     * expect(input.attr("placeholder")).toBe(null);
     * ```
     *
     * **[→ Full .attr() Docs](https://react-test.dev/documentation#attr)**
     */
    attr(name: string): string | null;
    change: Function;
    /**
     * Get the children nodes of all of the matched elements, optionally filtering them with a CSS selector:
     *
     * ```js
     * const list = $(<List />);
     * expect(list.children()).toHaveLength(3)
     * expect(list.children(".active")).toHaveLength(1);
     * ```
     *
     * **[→ Full .children() Docs](https://react-test.dev/documentation#children)**
     */
    children(selector?: string): ReactTest;
}
export default function $(component: React.ReactNode): ReactTest;
export {};
