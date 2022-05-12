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

const render = (component) => {
  const container = window.document.createElement("div");
  container.id = "root";
  window.document.body.appendChild(container);
  const root = createRoot(container);
  act(() => root.render(component));
  return [...container.childNodes];
};

// This takes a react object like <Button /> and returns the DOM tree
export default (obj) => {
  if (!obj) return [];

  if (["string", "number", "boolean"].includes(typeof obj)) {
    return render(obj);
  }

  // A react instance, so render it to jsdom:
  if (obj.$$typeof) {
    return render(obj);
  }

  // It's already parsed
  return (Array.isArray(obj) ? obj : [obj]).filter(
    (obj) => typeof obj === "object"
  );
};
