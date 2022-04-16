import { normalize, getPlainTag } from "../../helpers";

export default function (frag, value) {
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
    matches = selected.value === value;
  } else {
    throw new Error(
      "Not a valid element that has a value attribute. Please insert an element that has a value."
    );
  }

  if (this.affirmative && !matches) {
    const msg = `Expected ${base} to have value=${value}`;
    return { pass: false, message: () => msg };
  }

  if (this.isNot && matches) {
    const msg = `Expected ${base} not to have value=${value}`;
    return { pass: true, message: () => msg };
  }

  return { pass: !this.isNot };
}
