/**
 * Creates a namespace for a jig with statics as static methods,
 * and proto as prototype methods.
 * @param  {string} namespace - name of the existing/or to be created namespace.
 * @param  {object} statics - object with static methods
 * @param  {object} proto - object with prototype functions.
 * @return {object} jig   - namespace of a jig
 **/

var extend = require('util')._extend;

module.exports = function create(namespace, statics, proto) {

    'use strict';
    var jig, parent;
    /**Arguments can be ("namespace", {}, {},),
     *              or ("namespace", {}) -> Object is proto
     *              or ({}) -> proto
     *              or ({},{}) -> statics and proto.
     *    "JigName" can be a concatenation of strings (deep namespace)
     **/

    /**Find out which arguments are given**/
    if (typeof proto === 'undefined') {
        /**Arguments are ("namespace", {}), or ({},{})**/
        if (typeof statics !== 'undefined') {
            proto = statics;
            statics = typeof namespace === 'string' ? undefined : namespace;
            /**Argument is ({})**/
        } else {
            proto = namespace;
        }
    }
    /**1: Arguments are ("namespace", {}, {},) . Create
     non existing namespaces and assign last one to jig. **/
    if (typeof namespace === 'string') {
        var namespaces = namespace.split(".");
        var stringsGiven = namespaces.length;
        var tempGlobal, i, last;
        tempGlobal = global;
        last = stringsGiven - 1;
        /**For every str in namespace, check if it is already a namespace
         in global. If not, create it**/
        for (i = 0; i < stringsGiven - 1; i++) {
            if (typeof tempGlobal[namespaces[i]] === 'undefined') {
                tempGlobal[namespaces[i]] = {};
                tempGlobal[namespaces[i]].name = namespaces[i];
            }
            tempGlobal = tempGlobal[namespaces[i]];
        }
        parent = global[namespaces[0]];//First namespace mentioned.
        if (typeof tempGlobal[namespaces[last]] === 'undefined') {
            tempGlobal[namespaces[last]] = {};
        }
        jig = tempGlobal[namespaces[last]];
        jig.name = namespaces[last];
    }
    /**create jig object without name**/
    if (typeof jig === 'undefined') {
        jig = {};
    }

    /**add statics and proto methods to jig**/
    if (typeof jig.prototype === 'undefined') {
        jig.prototype = {};
    }
    extend(jig.prototype, proto);
    if (typeof statics !== 'undefined') {
        extend(jig, statics);
    }
    /**make sure that there are statics && prototype init methods**/
    if (typeof jig.init === 'undefined') {
        jig.init = function(){}
    }
    jig.init();

    if (typeof jig.prototype.init === 'undefined') {
        jig.prototype.init = {};
    }

    /**make sure there are prototype default & plugin Objects**/
    if (typeof jig.prototype.default === 'undefined') {
        jig.prototype.default = {};
    }
    if (typeof jig.prototype.plugin === 'undefined') {
        jig.prototype.plugin = {};
    }
    if (typeof parent !== 'undefined') {
        jig = parent;
    }
    return jig;
}





