import "./jest-matchers/index.ts";

import $ from "./methods/constructor.ts";

// Import all of the methods which will modify the $.prototype straight away
import "./methods/array/index.ts";
import "./methods/attr/index.ts";
import "./methods/change/index.ts";
import "./methods/children/index.ts";
import "./methods/click/index.ts";
import "./methods/closest/index.ts";
import "./methods/data/index.ts";
import "./methods/delay/index.ts";
import "./methods/each/index.ts";
import "./methods/filter/index.ts";
import "./methods/find/index.ts";
import "./methods/get/index.ts";
import "./methods/html/index.ts";
import "./methods/is/index.ts";
import "./methods/map/index.ts";
import "./methods/not/index.ts";
import "./methods/parent/index.ts";
import "./methods/props/index.ts";
import "./methods/render/index.ts";
import "./methods/siblings/index.ts";
import "./methods/submit/index.ts";
import "./methods/text/index.ts";
import "./methods/trigger/index.ts";
import "./methods/type/index.ts";

export { act, until } from "./helpers/index.ts";

// Export the whole thing
export default $;
