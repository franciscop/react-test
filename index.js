(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom'], factory) :
  (global = global || self, factory(global.$ = {}, global.React, global.ReactDOM));
}(this, (function (exports, React, reactDom) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  reactDom = reactDom && Object.prototype.hasOwnProperty.call(reactDom, 'default') ? reactDom['default'] : reactDom;

  const delay = (time) => new Promise((done) => setTimeout(done, time));

  const untilCallback = async (cb) => {
    let value = await cb();
    while (!value) {
      await React.act(async () => {
        await delay(50);
        value = await cb();
      });
    }
    return value;
  };

  const execute = (obj, chain) => {
    let newObj = obj;
    for (let [key, args] of chain) {
      newObj = newObj[key](...args);
    }
    return newObj;
  };

  // Store the action chain in an object, and execute it when we find '.then'
  const untilObject = (obj) => {
    const chain = [];
    const getter = (target, key) => {
      if (key === "then") {
        return async (cb) => {
          let res;
          while (!res) {
            await React.act(async () => {
              await delay(50);
              res = execute(obj, chain);

              // If it's an object that looks like an instance, we want to ignore
              // the cases where there are no matched nodes and keep looping then
              if (res && res.nodes && !res.nodes.length) {
                res = false;
              }
            });
          }
          return cb(res);
        };
      } else {
        return (...args) => {
          chain.push([key, args]);
          return new Proxy(obj, { get: getter });
        };
      }
    };
    return new Proxy(obj, { get: getter });
  };

  /**
   * Wait until the specified condition is fulfilled. There are multiple ways of specifying the conditions:
   *
   * ```js
   * await until(() => new Date() - init > 1000);
   * await until(button).is(".active");
   * await until(list).find("li");
   * ```
   *
   * **[→ Full until() Docs](https://react-test.dev/documentation#until)**
   */
  function until(arg) {
    if (typeof arg === "function") {
      return untilCallback(arg);
    }
    if (typeof arg === "object") {
      return untilObject(arg);
    }
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var client = createCommonjsModule(function (module, exports) {


  if (process.env.NODE_ENV === 'production') {
    exports.createRoot = reactDom.createRoot;
    exports.hydrateRoot = reactDom.hydrateRoot;
  } else {
    var i = reactDom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    exports.createRoot = function(c, o) {
      i.usingClientEntryPoint = true;
      try {
        return reactDom.createRoot(c, o);
      } finally {
        i.usingClientEntryPoint = false;
      }
    };
    exports.hydrateRoot = function(c, h, o) {
      i.usingClientEntryPoint = true;
      try {
        return reactDom.hydrateRoot(c, h, o);
      } finally {
        i.usingClientEntryPoint = false;
      }
    };
  }
  });
  var client_1 = client.createRoot;
  var client_2 = client.hydrateRoot;

  global.IS_REACT_ACT_ENVIRONMENT = true;

  const createCatcher = () => {
    class Catcher extends React__default.Component {
      constructor(props) {
        super(props);
        this.state = { error: null };
        window.addEventListener("error", this.onError.bind(this));
      }
      static getDerivedStateFromError(error) {
        return { error };
      }
      componentWillUnmount() {
        window.removeEventListener("error", this.onError);
      }
      onError(event) {
        // This elevates the errors from local in the render tree
        // to global in the test level
        event.preventDefault();
        this.componentDidCatch(event.error);
      }
      componentDidCatch(error) {
        Catcher.error = error;
      }
      render() {
        if (this.state && this.state.error) return null;
        return this.props.children;
      }
    }

    return Catcher;
  };

  const createContainer = () => {
    const Catcher = createCatcher();
    const container = window.document.createElement("div");
    container.id = "root";
    window.document.body.appendChild(container);
    const root = client_1(container);
    container.root = root;

    // Render the component and catch any error during this rendering
    container.render = (component) => {
      container.component = component;
      const comp = React__default.createElement(Catcher, null, component);
      React.act(() => root.render(comp));
      if (Catcher.error) {
        React.act(() => root.unmount());
        throw Catcher.error;
      }
    };

    return container;
  };

  // This takes a react object like <Button /> and returns the DOM tree
  var render = (obj) => {
    if (!obj) return [];

    // A react instance or a plain value, so render it to jsdom:
    if (obj.$$typeof || ["string", "number", "boolean"].includes(typeof obj)) {
      const container = createContainer();
      container.render(obj);
      return [...container.childNodes];
    }

    // It's already parsed
    return (Array.isArray(obj) ? obj : [obj]).filter(
      (obj) => typeof obj === "object"
    );
  };

  function ReactTest(obj, ctx = {}) {
    if (!(this instanceof ReactTest)) return new ReactTest(obj, ctx);

    this.events = ctx.events || {};
    const originalAddEventListener = window.addEventListener;

    window.addEventListener = (event, callback) => {
      this.events[event] = this.events[event] || [];
      this.events[event].push(callback);
      originalAddEventListener.call(window, event, callback); // Call native
    };

    document.addEventListener = (event, callback) => {
      this.events[event] = this.events[event] || [];
      this.events[event].push(callback);
    };

    try {
      this.nodes = render(obj);
    } catch (error) {
      this.nodes = [];
      this.error = error;
    }

    // Add a .length that goes to measure the nodes
    Object.defineProperty(this, "length", { get: () => this.nodes.length });

    return this;
  }

  // Allow to iterate with for...of and destructure it like [...$list.find('li')]
  ReactTest.prototype[Symbol.iterator] = function* () {
    for (let node of this.nodes) {
      yield node;
    }
  };

  // [INTERNAL USE ONLY]

  var normalize = (frag) => {
    if (!frag) {
      throw new Error(
        "expect() should receive an HTMLElement or React Test instance"
      );
    }

    // Convert a raw element to
    if (frag.$$typeof) return [...ReactTest(frag)];

    if (frag.error) return frag;

    // For now get the first one, consider looping later
    if (frag.array) frag = frag.array();

    // It's a single node
    if (!Array.isArray(frag)) frag = [frag];

    frag.forEach((node) => {
      // Make sure it's an HTML node
      if (!node.nodeName) {
        throw new Error(
          "expect() should receive an HTMLElement or React Test instance"
        );
      }
    });

    return frag;
  };

  // [INTERNAL USE ONLY
  // Retrieves a clear name for the passed element

  var getPlainTag = (el) => {
    if (!el) return null;

    // Get the full HTML tag WITHOUT its contents
    const html = el.cloneNode(false).outerHTML;

    // Regex should NOT be used generally for HTML. We make an exception here
    // because it's a very strict regex out of a very well defined output string
    return html.replace(/<\/[a-zA-Z0-9-]+>$/, "");
  };

  function toBeEnabled (frag) {
    // To avoid double negations ¯\_(ツ)_/¯
    this.affirmative = !this.isNot;

    // Convert it into a plain array of nodes
    frag = normalize(frag);

    for (let el of frag) {
      // Prepare the message if there's an error. It needs to build this string:
      // <input disabled="">
      const base = getPlainTag(el);

      // Boolean indicating if any of the received nodes have the attribute "disabled"
      const isEnabled = !el.disabled;

      // expect(<input />).toBeEnabled();
      if (this.affirmative) {
        if (!isEnabled) {
          const msg = `Expected ${base} not to include the attribute "disabled"`;
          return { pass: false, message: () => msg };
        }
      }

      // expect(<input type="text" disabled />).not.toBeEnabled();
      if (this.isNot) {
        if (isEnabled) {
          const msg = `Expected ${base} to include the attribute "disabled"`;
          return { pass: true, message: () => msg };
        }
      }
    }

    return { pass: !this.isNot };
  }

  function toHaveAttribute (frag, attr, val) {
    // To avoid double negations ¯\_(ツ)_/¯
    this.affirmative = !this.isNot;

    // Convert it into a plain array of nodes
    frag = normalize(frag);

    for (let el of frag) {
      const attributes = [...el.attributes];
      const base = getPlainTag(el);

      // Find attribute that matches passed in attr and val
      const found = attributes.some(({ name, value }) => {
        if (attr !== name) return false;
        if (val instanceof RegExp) return val.test(value);
        if (typeof val === "boolean") return value === "";
        return val ? value === val : true;
      });

      // Prepare val error message
      let valErrMessage = "";
      if (val instanceof RegExp) valErrMessage = ` that matches ${val}`;
      else if (val) valErrMessage = `="${val}"`;

      if (this.affirmative && !found) {
        const msg = `Expected ${base} to have attribute \`${attr}\`${valErrMessage}`;
        return { pass: false, message: () => msg };
      }

      if (this.isNot && found) {
        const msg = `Expected ${base} not to have attribute \`${attr}\`${valErrMessage}`;
        return { pass: true, message: () => msg };
      }
    }

    return { pass: !this.isNot };
  }

  const toStr = (list) => {
    return `class${list.length > 1 ? "es" : ""} "${list.join('", "')}"`;
  };

  function toHaveClass (frag, ...expectedClasses) {
    // To avoid double negations ¯\_(ツ)_/¯
    this.affirmative = !this.isNot;

    // Convert it into a plain array of nodes
    frag = normalize(frag);

    // All of the expected classes
    const expected = expectedClasses.flat();

    for (let el of frag) {
      // Prepare the message if there's an error. It needs to build this string:
      // <button class="primary button">
      const received = [...el.classList];
      const base = getPlainTag(el);

      // All the expected classes that have been received
      const found = expected.filter((name) => received.includes(name));

      // All of the expected classes that have NOT been received
      const notfound = expected.filter((name) => !received.includes(name));

      // expect(<div className="banana" />).toHaveClass('banana');
      if (this.affirmative) {
        if (found.length < expected.length) {
          const msg = `Expected ${base} to include ${toStr(notfound)}`;
          return { pass: false, message: () => msg };
        }
      }

      // expect(<div className="orange" />).not.toHaveClass('banana');
      if (this.isNot) {
        if (found.length) {
          const msg = `Expected ${base} not to include ${toStr(found)}`;
          return { pass: true, message: () => msg };
        }
      }
    }

    return { pass: !this.isNot };
  }

  function toHaveError(frag, expectedMessage) {
    const isAffirmative = !this.isNot;
    frag = normalize(frag);

    // Validate input
    if (
      !frag ||
      typeof frag !== "object" ||
      !("nodes" in frag) ||
      !("error" in frag)
    ) {
      return {
        pass: false,
        message: () =>
          `Expected a ReactTest instance with .nodes and .error properties, got ${this.utils.printReceived(
          frag
        )}`,
      };
    }

    const hasError = !!frag.error;
    const actualMessage = hasError ? frag.error.message : undefined;
    const nodeTag = frag.nodes[0] ? getPlainTag(frag.nodes[0]) : "component";

    if (isAffirmative) {
      // expect().toHaveError()
      if (!hasError) {
        return {
          pass: false,
          message: () => `Expected ${nodeTag} to throw an error, but it did not`,
        };
      }

      // No message provided, just check for any error
      if (expectedMessage === undefined) {
        return {
          pass: true,
          message: () => "Error thrown as expected",
        };
      }

      // Match specific message
      const pass = actualMessage === expectedMessage;
      return {
        pass,
        message: () =>
          pass
            ? "Error message matched"
            : `Expected ${nodeTag} to throw error with message ${this.utils.printExpected(
              expectedMessage
            )}, but got ${this.utils.printReceived(actualMessage)}`,
      };
    } else {
      // expect().not.toHaveError()
      if (hasError) {
        return {
          pass: false,
          message: () =>
            `Expected ${nodeTag} not to throw an error, but it threw: "${actualMessage}"`,
        };
      }

      // No error, as expected
      return {
        pass: true,
        message: () => "No error thrown as expected",
      };
    }
  }

  // Register with Jest
  expect.extend({ toHaveError });

  function toHaveHtml (frag, html) {
    this.affirmative = !this.isNot;
    frag = normalize(frag);
    if (typeof html !== "string") {
      const msg = `Second argument of .toHaveHtml() needs to be a string`;
      return { pass: this.isNot, message: () => msg };
    }

    for (let el of frag) {
      const hasHTML = el.outerHTML.includes(html.trim());

      if (this.affirmative && !hasHTML) {
        const msg = `Expected ${el.outerHTML} to include ${html}`;
        return { pass: false, message: () => msg };
      }

      if (this.isNot && hasHTML) {
        const msg = `Expected ${el.outerHTML} not to include ${html}`;
        return { pass: true, message: () => msg };
      }
    }

    return { pass: !this.isNot };
  }

  const whitespace = (str) => str.replace(/\s+/g, " ");

  function toHaveText (frag, expected) {
    // To avoid double negations ¯\_(ツ)_/¯
    this.affirmative = !this.isNot;

    // Convert it into a plain array of nodes
    frag = normalize(frag);

    for (let el of frag) {
      // Prepare the message if there's an error. It needs to build this string:
      // <button class="primary button">
      const received = el.textContent;
      const base = getPlainTag(el);

      // expect(<div>banana</div>).toHaveText('banana');
      if (this.affirmative) {
        if (whitespace(received) !== whitespace(expected)) {
          const msg = `Expected ${base} to have text "${expected}" but it received "${received}"`;
          return { pass: false, message: () => msg };
        }
      }

      // expect(<div>orange</div>).not.toHaveText('banana');
      else {
        if (whitespace(received) === whitespace(expected)) {
          const msg = `Expected ${base} not to have the text "${received}"`;
          return { pass: true, message: () => msg };
        }
      }
    }

    return { pass: !this.isNot };
  }

  function toHaveValue (frag, value = true) {
    // To avoid double negations ¯\_(ツ)_/¯
    this.affirmative = !this.isNot;

    // Convert it into a plain array of nodes
    frag = normalize(frag);

    //Should only handle one element
    if (frag.length > 1)
      throw new Error(
        "Cannot check multiple elements for values. Please pass only one element."
      );

    const el = frag[0];

    const tagName = el.tagName.toLowerCase();
    if (tagName === "input" && ["checkbox", "radio"].includes(el.type)) {
      throw new Error(
        'Cannot check .toHaveValue() for input type="checkbox" or type="radio".'
      );
    }

    const base = getPlainTag(el);
    let matches = false;
    if (tagName === "input") {
      matches =
        el.type === "number" ? Number(el.value) === value : el.value === value;
    } else if (tagName === "textarea") {
      matches = el.value === value;
    } else if (tagName === "select") {
      const selected = [...el.options].find((option) => option.selected);
      if (selected) {
        if (value === true) {
          matches = true;
        } else {
          matches = selected.value === value;
        }
      } else {
        if (value === true) {
          const msg = `Expected an option to be selected in ${base} (but none was)`;
          return { pass: false, message: () => msg };
        } else {
          matches = !value;
        }
      }
    } else {
      throw new Error(
        "Not a valid element that has a value attribute. Please insert an element that has a value."
      );
    }

    if (this.affirmative && !matches) {
      const msg = `Expected ${base} to have value="${value}"`;
      return { pass: false, message: () => msg };
    }

    if (this.isNot && matches) {
      const msg = `Expected ${base} not to have value=${value}`;
      return { pass: true, message: () => msg };
    }

    return { pass: !this.isNot };
  }

  function toMatchSelector (frag, selectorStr) {
    // To avoid double negations ¯\_(ツ)_/¯
    this.affirmative = !this.isNot;

    // Convert it into a plain array of nodes
    frag = normalize(frag);

    for (let el of frag) {
      const base = getPlainTag(el);
      const matches = el.matches(selectorStr);

      if (this.affirmative && !matches) {
        const msg = `Expected ${base} to match selector, ${selectorStr}`;
        return { pass: false, message: () => msg };
      }

      if (this.isNot && matches) {
        const msg = `Expected ${base} not to match selector, ${selectorStr}`;
        return { pass: true, message: () => msg };
      }
    }

    return { pass: !this.isNot };
  }

  // Parse JS camelCase style properties to lowercase hyphenated strings
  const parseCamelCase = (styleToParse) =>
    styleToParse
      .replace(/([a-z\d])([A-Z])/g, "$1" + "-" + "$2")
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + "-" + "$2")
      .toLowerCase();

  // Clean styles object to return string array of individual styles styles
  const cleanStylesObject = (styles) =>
    Object.entries(styles).map(
      ([key, value]) => `${parseCamelCase(key)}: ${value}`
    );

  // Split style string into array with all semicolons and spaces removed
  const cleanStylesStr = (stylesStr) => {
    let styles = stylesStr.split("; ");
    styles[styles.length - 1] = styles[styles.length - 1].replace(/;/g, "");
    return styles;
  };

  // Get correct error msg string depending on number of incorrect styles
  const getErrorStr = (incorrectStyles) =>
    `style${incorrectStyles.length > 1 ? "s" : ""} [${incorrectStyles.join(
    ", "
  )}]`;

  function toHaveStyle (frag, styles) {
    // To avoid double negations ¯\_(ツ)_/¯
    this.affirmative = !this.isNot;

    // Convert it into a plain array of nodes
    frag = normalize(frag);

    for (let el of frag) {
      // Get the element string for use in error message if test fails
      const base = getPlainTag(el);

      // Get an array of style strings present on the HTML element
      const elStyles = Object.entries(el.style["_values"]).map(
        ([key, value]) => `${key}: ${value}`
      );

      // Get an array of style strings to search for in the element styles. Has to handle styles argument of either type string or type object
      let stylesArray =
        typeof styles === "string"
          ? cleanStylesStr(styles)
          : cleanStylesObject(styles);

      // expect(<div style={{display: "none"}} />).toHaveStyle({ display: "none" });
      if (this.affirmative) {
        // Check each of the search styles to see if they're present on the HTML element and isolate missing styles
        const missingStyles = stylesArray.filter(
          (styleToBeChecked) => !elStyles.includes(styleToBeChecked)
        );

        if (missingStyles.length) {
          const msg = `Expected ${base} to include ${getErrorStr(missingStyles)}`;
          return { pass: false, message: () => msg };
        }
      }

      // expect(<div style={{display: "none"}} />).not.toHaveStyle({ backgroundColor: "red" });
      if (this.isNot) {
        // Check each of the search styles to see if they're incorrectly present on the HTML element and isolate those that are
        const incorrectStyles = stylesArray.filter((styleToBeChecked) =>
          elStyles.includes(styleToBeChecked)
        );

        if (incorrectStyles.length) {
          const msg = `Expected ${base} not to include ${getErrorStr(
          incorrectStyles
        )}`;
          return { pass: true, message: () => msg };
        }
      }
    }

    return { pass: !this.isNot };
  }

  expect.extend({
    toBeEnabled,
    toHaveAttribute,
    toHaveClass,
    toHaveError,
    toHaveHtml,
    toHaveText,
    toHaveValue,
    toMatchSelector,
    toHaveStyle,
  });

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
   * @param {(string)} name
   */
  ReactTest.prototype.attr = function (name) {
    const node = this.get(0);
    return /** @type {(string|null)} */ (node && node.getAttribute(name));
  };

  /**
   * Get all of the matched nodes as a plain array. Optionally extract data of each node either with a key used as an prop, or with a callback:
   *
   * ```js
   * const list = $(<List />).children();
   * list.array();  // [<li>A</li>, <li>B</li>, <li>C</li>]
   * list.array("nodeName");  // ["LI", "LI", "LI"]
   * list.array(node => node.innerText);  // ["A", "B", "C"]
   * ```
   *
   * **[→ Full .array() Docs](https://react-test.dev/documentation#array)**
   * @param {(string|function)} callback
   */
  ReactTest.prototype.array = function (callback = (node) => node) {
    if (typeof callback === "string") {
      const key = callback;
      callback = (node) => node[key];
    }
    return /** @type {(Node[]|string[])} */ (this.nodes.map(callback));
  };

  /**
   * Trigger a change in all of the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const input = $(<input defaultValue="hello" />);
   * expect(input).toHaveValue("hello");
   * await input.change("world");
   * expect(input).toHaveValue("world");
   * ```
   *
   * **[→ Full .change() Docs](https://react-test.dev/documentation#change)**
   * @param {(string|boolean)} value
   */
  ReactTest.prototype.change = async function (value) {
    // This is needed for uncontrolled inputs
    this.map((node) => {
      if (
        node.nodeName === "INPUT" &&
        ["checkbox", "radio"].includes(node.type)
      ) {
        node.checked = value;
      } else {
        node.value = value;
      }
    });

    await this.trigger("change", { target: { value } });
    return null;
  };

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
  ReactTest.prototype.children = function (selector = "*") {
    return this.map((node) => [...node.children]).filter(selector);
  };

  /**
   * Trigger a click on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const counter = $(<Counter />);
   * expect(counter.text()).toEqual("0");
   * await counter.click();
   * expect(counter.text()).toEqual("1");
   * ```
   *
   * **[→ Full .click() Docs](https://react-test.dev/documentation#click)**
   */
  ReactTest.prototype.click = function () {
    return this.trigger("click");
  };

  /**
   * Find the first ancestor that matches the selector for each element (deduplicated):
   *
   * ```js
   * const list = $(<List />);
   * const item = list.find("a").closest("li");
   * expect(item.html()).toBe("<li><a>A</a></li>");
   * ```
   *
   * **[→ Full .closest() Docs](https://react-test.dev/documentation#closest)**
   */
  ReactTest.prototype.closest = function (selector = "*") {
    return this.map((node) => node.closest(selector));
  };

  /**
   * Read the data-attribute value of the first node and return its value:
   *
   * ```js
   * const card = $(<div data-id="25" data-selected />);
   * expect(card.data("id")).toBe("25");
   * expect(card.data("selected")).toBe("true");
   * expect(card.data("name")).toBe(null);
   * ```
   *
   * **[→ Full .data() Docs](https://react-test.dev/documentation#data)**
   */
  ReactTest.prototype.data = function (name) {
    return this.attr(`data-${name}`);
  };

  /**
   * Makes the component to wait for the specified period of time in milliseconds:
   *
   * ```js
   * const down = $(<CountDown />);
   * expect(down).toHaveText("3");
   * await down.delay(4000); // 4 seconds
   * expect(down).toHaveText("Done!");
   * ```
   *
   * **[→ Full .delay() Docs](https://react-test.dev/documentation#delay)**
   */
  ReactTest.prototype.delay = async function (time) {
    await React.act(() => new Promise((done) => setTimeout(done, time)));
  };

  /**
   * Iterates over each of the nodes and returns the same collection of nodes as there was before:
   *
   * ```js
   * const items = $(<List />).find("li");
   * const texts = [];
   * items.each((node) => texts.push(node.innerText));
   * expect(texts).toEqual(["A", "B", "C"]);
   * ```
   *
   * **[→ Full .each() Docs](https://react-test.dev/documentation#each)**
   */
  ReactTest.prototype.each = function (callback = () => {}) {
    this.array(callback);
    return this;
  };

  /**
   * Keep only the nodes that match the selector, removing the others:
   *
   * ```js
   * const items = $(<ChatRooms />).children();
   * const people = items.filter(".user").array("innerText");
   * expect(people).toEqual(["John", "Sarah"]);
   * ```
   *
   * **[→ Full .filter() Docs](https://react-test.dev/documentation#filter)**
   */
  ReactTest.prototype.filter = function (selector = "*") {
    // An plain string
    if (typeof selector === "string") {
      const sel = selector;
      selector = (node) => node.matches(sel);
    }
    // An instance of ReactTest
    if (selector.nodes) {
      const sel = selector;
      selector = (node) => sel.nodes.includes(node);
    }
    return ReactTest(this.array().filter(selector), this);
  };

  /**
   * Get all of the descendants of the nodes with an optional filter:
   *
   * ```js
   * const links = $(<ChatRooms />).find("a");
   * expect(links).toHaveAttribute("src");
   * ```
   *
   * **[→ Full .find() Docs](https://react-test.dev/documentation#find)**
   * @param {(string)} selector
   */
  ReactTest.prototype.find = function (selector) {
    if (!selector) return this;
    return this.map((node) => [...node.querySelectorAll(selector)]);
  };

  /**
   * Get a native DOM Node given its index. Defaults to the first element:
   *
   * ```js
   * const item = $(<List />).children().get(0);
   * expect(item.innerText).toBe("First Item");
   * ```
   *
   * **[→ Full .get() Docs](https://react-test.dev/documentation#get)**
   */
  ReactTest.prototype.get = function (index = 0) {
    // Convert it to a plain array
    const nodes = this.array();

    // No elements at all; cannot match
    if (!nodes.length) return null;

    // Wrap around overflowing indexes
    index = index % nodes.length;

    // Ensure the index is positive
    index = (nodes.length + index) % nodes.length;

    // Return the correct node
    return nodes[index];
  };

  /**
   * Retrieve the OuterHTML of the first element matched, with the whitespace normalized:
   *
   * ```js
   * const items = $(<List />).children();
   * expect(items.html()).toBe("<li>First Item</li>");
   * ```
   *
   * **[→ Full .html() Docs](https://react-test.dev/documentation#html)**
   */
  ReactTest.prototype.html = function () {
    const node = this.get(0);
    return node ? node.outerHTML : "";
  };

  /**
   * Check whether all of the nodes match the selector:
   *
   * ```js
   * const items = $(<List />).children();
   * expect(items.is("li")).toBe(true);
   * ```
   *
   * **[→ Full .is() Docs](https://react-test.dev/documentation#is)**
   */
  ReactTest.prototype.is = function (selector = "*") {
    return this.filter(selector).length === this.length;
  };

  /**
   * Iterates over each of the nodes and returns a new collection with the nodes that were returned from the callback:
   *
   * ```js
   * const items = $(<List />).map(node => {
   *   return node.querySelectorAll("li");
   * }).array("nodeName");
   * expect(items).toBe(["LI", "LI"]);
   * ```
   *
   * **[→ Full .map() Docs](https://react-test.dev/documentation#map)**
   */
  ReactTest.prototype.map = function (callback) {
    // We don't want to select repeated nodes
    const nodes = [];
    this.array(callback)
      // Convert any potential NodeList into an array of plain nodes
      .map((ret) => (ret && ret.forEach ? [...ret] : ret))
      .flat()
      .forEach((node) => {
        if (!node) return;
        if (nodes.includes(node)) return;
        nodes.push(node);
      });
    return ReactTest(nodes, this);
  };

  /**
   * Remove the matched nodes from the collection. It's the opposite of .filter():
   *
   * ```js
   * const items = $(<ChatRooms />).children();
   * const groups = items.not(".user").array("innerText");
   * expect(groups).toEqual(["Summer", "Birthday"]);
   * ```
   *
   * **[→ Full .not() Docs](https://react-test.dev/documentation#not)**
   */
  ReactTest.prototype.not = function (filter = "*") {
    if (typeof filter === "function") {
      throw new Error("A callback is not allowed for .not()");
    }
    return this.filter((node) => !ReactTest(node).is(filter));
  };

  /**
   * Return a new collection with the direct parent of the current nodes with an optional filter:
   *
   * ```js
   * const list = $(<List />);
   * const items = list.find("li > a").parent();
   * expect(items.array("nodeName")).toEqual(["LI", "LI"]);
   * ```
   *
   * **[→ Full .parent() Docs](https://react-test.dev/documentation#parent)**
   */
  ReactTest.prototype.parent = function () {
    return this.map((node) => node.parentNode);
  };

  /**
   * Re-render a component with the new props specified as a plain object:
   *
   * ```js
   * const demo = $(<Demo className="hello" />);
   * expect(demo).toHaveHtml(`<div class="hello">world</div>`);
   * demo.props({ className: "bye" });
   * expect(demo).toHaveHtml(`<div class="bye">world</div>`);
   * ```
   *
   * **[→ Full .props() Docs](https://react-test.dev/documentation#props)**
   */
  ReactTest.prototype.props = function (props) {
    const container = this.nodes[0].closest("#root");
    if (typeof props === "function") {
      props = props(container.component.props);
    }
    container.render({ ...container.component, props });
    this.nodes = [...container.childNodes];
    return this;
  };

  /**
   * Rerender the component as specified with the new value:
   *
   * ```js
   * const demo = $(<Demo className="hello" />);
   * expect(demo).toHaveHtml(`<div class="hello">world</div>`);
   * demo.render(<Demo className="bye" />);
   * expect(demo).toHaveHtml(`<div class="bye">world</div>`);
   * ```
   *
   * **[→ Full .render() Docs](https://react-test.dev/documentation#render)**
   */
  ReactTest.prototype.render = function (component) {
    const container = this.nodes[0].closest("#root");
    container.render(component);
    this.nodes = [...container.childNodes];
    return this;
  };

  /**
   * Find all of the sibling nodes to the current one:
   *
   * ```js
   * const list = $(<List />);
   * const items = list.find("li.active").siblings();
   * expect(items.array("className")).toEqual(["", ""]);
   * ```
   *
   * **[→ Full .siblings() Docs](https://react-test.dev/documentation#siblings)**
   */
  ReactTest.prototype.siblings = function (selector) {
    return this.parent().children(selector).not(this);
  };

  /**
   * Trigger a form submission on all the matched forms. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const onSubmit = jest.fn();
   * const createUser = $(<CreateUser onSubmit={onSubmit} />);
   * expect(onSubmit).not.toBeCalled();
   * await createUser.submit();
   * expect(onSubmit).toBeCalled();
   * ```
   *
   * **[→ Full .submit() Docs](https://react-test.dev/documentation#submit)**
   */
  ReactTest.prototype.submit = function () {
    return this.trigger("submit");
  };

  const whitespace$1 = (str) => str.replace(/\s+/g, " ");

  /**
   * Get the textContent of the first matched node:
   *
   * ```js
   * const greeting = $(<Greeting />);
   * expect(greeting.text()).toBe("Hello world");
   * ```
   *
   * **[→ Full .text() Docs](https://react-test.dev/documentation#text)**
   */
  ReactTest.prototype.text = function () {
    const node = this.get(0);
    return node ? whitespace$1(node.textContent) : "";
  };

  // [INTERNAL USE ONLY]

  const findParents = (node, list = []) => {
    list.push(node); // add current node
    // do recursion until BODY is reached
    if (node.tagName !== "BODY") return findParents(node.parentNode, list);
    else return list;
  };

  const getEvents = (node) => {
    const handlers = Object.entries(node)
      .filter(([k]) => /^__reactProps/.test(k))
      .map((p) => p[1])
      .shift();
    if (handlers && Object.keys(handlers).length) {
      return handlers;
    }
  };

  const createEvent = (type, props) => {
    const event = new Event(type);
    for (let key in props) {
      Object.defineProperty(event, key, {
        value: props[key],
        enumerable: true,
        configurable: true,
      });
    }
    return event;
  };

  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  /**
   * Simulates an event happening on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const fn = jest.fn();
   * const canvas = $(<canvas onClick={fn}></canvas>);
   * await canvas.trigger("click", { clientX: 10, clientY: 20 });
   * const event = fn.mock.calls[0][0];
   * expect(event).toMatchObject({ clientX: 10, clientY: 20 });
   * ```
   *
   * **[→ Full .trigger() Docs](https://react-test.dev/documentation#trigger)**
   */
  ReactTest.prototype.trigger = function (type, extra = {}) {
    // TODO: probably whitelist this
    const propName = `on${capitalize(type)}`.replace(
      /(down|up|left|right|in|out|move)$/i,
      capitalize
    );
    return React.act(async () => {
      await Promise.all(
        this.map(async (target) => {
          const parents = findParents(target);

          // The events manually registered on the root element
          if (this.events && this.events[type]) {
            const currentTarget = parents[parents.length - 1];
            const event = createEvent(type, { target, currentTarget, ...extra });
            this.events[type].map((cb) => cb(event));
          }

          // If there's a direct way of calling it e.g. `button.click()`
          if (target[type]) {
            if (type === "click") {
              const event = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                ...extra,
              });
              target.dispatchEvent(event);
            } else {
              target[type](createEvent(type, { target, ...extra }));
            }
          } else {
            const events = parents
              .map((el) => [getEvents(el), el])
              .filter((ev) => ev[0])
              .map((evts) => [evts[0][propName], evts[1]])
              .filter((evts) => evts[0])
              .map(([cb, target]) => cb(createEvent(type, { target, ...extra })));
            await Promise.all(events);
          }
        })
      );
    });
  };

  /**
   * Simulates typing the text on all the matched elements. It should be awaited for the side effects to run and the component to re-rendered:
   *
   * ```js
   * const input = $(<input />);
   * expect(input).toHaveValue("");
   * await input.type("Francisco");
   * expect(input).toHaveValue("Francisco");
   * ```
   *
   * **[→ Full .type() Docs](https://react-test.dev/documentation#type)**
   */
  ReactTest.prototype.type = async function (input) {
    const strings = input.split("").map((k, i) => input.slice(0, i + 1));
    for (let value of strings) {
      await this.change(value);
      await this.delay(10);
    }
  };

  exports.act = React.act;
  exports.default = ReactTest;
  exports.until = until;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
