import jest from "./jest";

import $ from "./constructor";

// Import all of the methods which will modify the $.prototype straight away
import "./attr";
import "./click";
import "./find";
import "./first";
import "./html";
import "./is";
import "./last";
import "./unique";
import "./map";
import "./text";
import "./trigger";
import "./children";
import "./closest";

export { default as until } from "./until";

// Export the whole thing
export default $;
