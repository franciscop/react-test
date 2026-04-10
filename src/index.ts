import "./jest-matchers/index";

import $ from "./methods/constructor";

// Import all of the methods which will modify the $.prototype straight away
import "./methods/array/index";
import "./methods/attr/index";
import "./methods/change/index";
import "./methods/children/index";
import "./methods/click/index";
import "./methods/closest/index";
import "./methods/data/index";
import "./methods/delay/index";
import "./methods/each/index";
import "./methods/filter/index";
import "./methods/find/index";
import "./methods/get/index";
import "./methods/html/index";
import "./methods/is/index";
import "./methods/map/index";
import "./methods/not/index";
import "./methods/parent/index";
import "./methods/props/index";
import "./methods/render/index";
import "./methods/siblings/index";
import "./methods/submit/index";
import "./methods/text/index";
import "./methods/trigger/index";
import "./methods/type/index";

export { act, until } from "./helpers/index";

// Export the whole thing
export default $;
