import "./jest-matchers";

import $ from "./methods/constructor";

// Import all of the methods which will modify the $.prototype straight away
import "./methods/attr";
import "./methods/array";
import "./methods/change";
import "./methods/children";
import "./methods/click";
import "./methods/closest";
import "./methods/data";
import "./methods/delay";
import "./methods/each";
import "./methods/filter";
import "./methods/find";
import "./methods/first";
import "./methods/get";
import "./methods/html";
import "./methods/is";
import "./methods/last";
import "./methods/map";
import "./methods/not";
import "./methods/parent";
import "./methods/siblings";
import "./methods/submit";
import "./methods/text";
import "./methods/toArray";
import "./methods/trigger";
import "./methods/type";

export { act, until } from "./helpers/";

// Export the whole thing
export default $;
