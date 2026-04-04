import React from "react";

const formToObject = (form: HTMLFormElement): Record<string, string> => {
  const values: Record<string, string> = {};
  for (const obj of form.elements as unknown as HTMLInputElement[]) {
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

export default function Signup({
  onSubmit,
}: {
  onSubmit: (values: Record<string, string>) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formToObject(e.target as HTMLFormElement));
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
