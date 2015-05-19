/**
 * [exports description]
 * @param  {string} namespace One (or a concatenation) of namespaces.
 * @param  {object} hooks     Extra functions to be added in the jig.
 * @return {function}         It returns the namespace with the hooks added.
 */

var extend = require('util')._extend;

module.exports = function plugin(namespace, hooks) {
    var Jig = require("jig.js");
    /**namespace doesn't exist -> create it.**/
    if (typeof global[namespace] === 'undefined') {//jigName does not exists
        Jig.create(namespace, {});
    }
    var jig = global;
    var namespaces = namespace.split("."), stringsGiven = namespaces.length;
    /**Assign last namespace to jig**/
    for (var i = 0; i < stringsGiven; i++) {
        jig = jig[namespaces[i]];
    }
    extend(jig.prototype.plugins, hooks);
}

