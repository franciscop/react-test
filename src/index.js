import "./jest-matchers";

import $ from "./methods/constructor";

// Import all of the methods which will modify the $.prototype straight away
import "./methods/attr";
import "./methods/click";
import "./methods/data";
import "./methods/find";
import "./methods/get";
import "./methods/first";
import "./methods/html";
import "./methods/is";
import "./methods/last";
import "./methods/unique";
import "./methods/map";
import "./methods/text";
import "./methods/toArray";
import "./methods/trigger";
import "./methods/children";
import "./methods/closest";

export { default as until } from "./helpers/until";

// Export the whole thing
export default $;
