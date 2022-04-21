import React from "react";

const formToObject = (form) => {
  const values = {};
  for (let obj of form.elements) {
    if (obj.type === "submit") {
      // Purposefully left empty
    } else if (obj.type === "checkbox") {
      if (obj.checked) {
        values[obj.name] = obj.value;
      }
    } else if (obj.type === "radio") {
      if (obj.checked) {
        values[obj.name] = obj.value;
      }
    } else {
      values[obj.name] = obj.value;
    }
  }
  return values;
};

export default function Signup({ onSubmit = () => {} }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formToObject(e.target));
      }}
    >
      <input name="username" type="text" />
      <input name="tos" type="checkbox" />
      <input name="option" type="radio" value="a" defaultChecked />
      <input name="option" type="radio" value="b" />
      <button>Send</button>
    </form>
  );
}
