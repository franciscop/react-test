import { getPlainTag, normalize } from "../../helpers/index.ts";

export default function (
  this: any,
  frag: any,
  value: string | boolean | number = true
): jest.CustomMatcherResult {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  // Convert it into a plain array of nodes
  frag = normalize(frag);

  //Should only handle one element
  if (frag.length > 1)
    throw new Error(
      "Cannot check multiple elements for values. Please pass only one element."
    );

  const el = frag[0] as
    | HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement;

  const tagName = el.tagName.toLowerCase();
  if (
    tagName === "input" &&
    ["checkbox", "radio"].includes((el as HTMLInputElement).type)
  ) {
    throw new Error(
      'Cannot check .toHaveValue() for input type="checkbox" or type="radio".'
    );
  }

  const base = getPlainTag(el);
  let matches = false;
  if (tagName === "input") {
    const input = el as HTMLInputElement;
    matches =
      input.type === "number"
        ? Number(input.value) === value
        : input.value === value;
  } else if (tagName === "textarea") {
    matches = (el as HTMLTextAreaElement).value === value;
  } else if (tagName === "select") {
    const select = el as HTMLSelectElement;
    const selected = [...select.options].find((option) => option.selected);
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

  return { pass: !this.isNot, message: () => "" };
}
