// [INTERNAL USE ONLY]
import $ from "../constructor";

// Removed duplicated nodes, used for some specific methods
$.prototype.unique = function () {
    return $(this.nodes.reduce(function (clean, node) {
        var istruthy = node !== null && node !== undefined && node !== false;
        return (istruthy && clean.indexOf(node) === -1) ? clean.concat(node) : clean;
    }, []));
};