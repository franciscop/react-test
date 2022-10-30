import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

global.IS_REACT_ACT_ENVIRONMENT = true;

const createBoundaries = () => {
  const handler = { error: false };

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
      handler.error = error;
    }
    render() {
      if (this.state && this.state.isError) return null;
      return this.props.children;
    }
  }
  return [handler, Catcher];
};

const renderRoot = (component) => {
  const [handler, Catcher] = createBoundaries();
  const container = window.document.createElement("div");
  container.id = "root";
  container.handler = handler;
  container.catcher = Catcher;
  container.component = component;
  window.document.body.appendChild(container);
  const root = createRoot(container);
  container.root = root;
  act(() => root.render(React.createElement(Catcher, null, component)));
  if (handler.error) {
    act(() => root.unmount());
    throw handler.error;
  }
  return [...container.childNodes];
};

// This takes a react object like <Button /> and returns the DOM tree
export default (obj) => {
  if (!obj) return [];

  if (["string", "number", "boolean"].includes(typeof obj)) {
    return renderRoot(obj);
  }

  // A react instance, so render it to jsdom:
  if (obj.$$typeof) {
    return renderRoot(obj);
  }

  // It's already parsed
  return (Array.isArray(obj) ? obj : [obj]).filter(
    (obj) => typeof obj === "object"
  );
};
