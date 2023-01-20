import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

global.IS_REACT_ACT_ENVIRONMENT = true;

const createCatcher = () => {
  class Catcher extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isError: false };
      window.addEventListener("error", this.onError.bind(this));
    }
    static getDerivedStateFromError() {
      return { isError: true };
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
      if (this.state && this.state.isError) return null;
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
  const root = createRoot(container);
  container.root = root;

  // Render the component and catch any error during this rendering
  container.render = (component) => {
    container.component = component;
    act(() => root.render(React.createElement(Catcher, null, component)));
    if (Catcher.error) {
      act(() => root.unmount());
      throw Catcher.error;
    }
  };

  return container;
};

// This takes a react object like <Button /> and returns the DOM tree
export default (obj) => {
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
