import { normalize, getPlainTag } from "../../helpers";

export default function (frag, attr, val) {
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
