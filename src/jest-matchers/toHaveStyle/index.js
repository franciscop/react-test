import { normalize, getPlainTag } from "../../helpers";

// Parse JS camelCase style properties to lowercase hyphenated strings
const parseCamelCase = (styleToParse) =>
  styleToParse
    .replace(/([a-z\d])([A-Z])/g, "$1" + "-" + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + "-" + "$2")
    .toLowerCase();

// Clean styles object to return string array of individual styles styles
const cleanStylesObject = (styles) =>
  Object.entries(styles).map(
    ([key, value]) => `${parseCamelCase(key)}: ${value}`
  );

// Split style string into array with all semicolons and spaces removed
const cleanStylesStr = (stylesStr) => {
  let styles = stylesStr.split("; ");
  styles[styles.length - 1] = styles[styles.length - 1].replace(/;/g, "");
  return styles;
};

// Get correct error msg string depending on number of incorrect styles
const getErrorStr = (incorrectStyles) =>
  `style${incorrectStyles.length > 1 ? "s" : ""} [${incorrectStyles.join(
    ", "
  )}]`;

export default function (frag, styles) {
  // To avoid double negations ¯\_(ツ)_/¯
  this.affirmative = !this.isNot;

  // Convert it into a plain array of nodes
  frag = normalize(frag);

  for (let el of frag) {
    // Get the element string for use in error message if test fails
    const base = getPlainTag(el);

    // Get an array of style strings present on the HTML element
    const elStyles = Object.entries(el.style["_values"]).map(
      ([key, value]) => `${key}: ${value}`
    );

    // Get an array of style strings to search for in the element styles. Has to handle styles argument of either type string or type object
    let stylesArray =
      typeof styles === "string"
        ? cleanStylesStr(styles)
        : cleanStylesObject(styles);

    // expect(<div style={{display: "none"}} />).toHaveStyle({ display: "none" });
    if (this.affirmative) {
      // Check each of the search styles to see if they're present on the HTML element and isolate missing styles
      const missingStyles = stylesArray.filter(
        (styleToBeChecked) => !elStyles.includes(styleToBeChecked)
      );

      if (missingStyles.length) {
        const msg = `Expected ${base} to include ${getErrorStr(missingStyles)}`;
        return { pass: false, message: () => msg };
      }
    }

    // expect(<div style={{display: "none"}} />).not.toHaveStyle({ backgroundColor: "red" });
    if (this.isNot) {
      // Check each of the search styles to see if they're incorrectly present on the HTML element and isolate those that are
      const incorrectStyles = stylesArray.filter((styleToBeChecked) =>
        elStyles.includes(styleToBeChecked)
      );

      if (incorrectStyles.length) {
        const msg = `Expected ${base} not to include ${getErrorStr(
          incorrectStyles
        )}`;
        return { pass: true, message: () => msg };
      }
    }
  }

  return { pass: !this.isNot };
}
