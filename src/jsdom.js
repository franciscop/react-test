// From react-jsdom
import Window from "window";
import ReactDOM from "react-dom";

export default component => {
  window = window || new Window();
  const document = window.document;

  const origGlobals = {
    window: global.window,
    document: global.document
  };
  global.window = window;
  global.document = document;

  const container = document.createElement("div");
  container.id = "root";
  document.body.appendChild(container);

  ReactDOM.render(component, container);

  Object.keys(origGlobals).forEach(prop => {
    global[prop] = origGlobals[prop];
  });

  return container.children[0];
};
