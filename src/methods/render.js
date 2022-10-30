import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

global.IS_REACT_ACT_ENVIRONMENT = true;

// // Before
// import { render } from 'react-dom';
// const container = document.getElementById('app');
// render(<App tab="home" />, container);
//
// // After
// import { createRoot } from 'react-dom/client';
// const container = document.getElementById('app');
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);

const createBoundaries = () => {
  const handler = { error: false };
  class Catcher extends React.Component {
    static getDerivedStateFromError() {
      return { isError: true };
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
  container.component = React.createElement(Catcher, null, component);
  window.document.body.appendChild(container);
  const root = createRoot(container);
  container.root = root;
  act(() => root.render(component));
  if (handler.error) {
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
