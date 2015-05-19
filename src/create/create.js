/**
 * Creates a namespace for a jig with statics as static methods,
 * and proto as prototype methods.
 * @param  {string} namespace - name of the existing/or to be created namespace.
 * @param  {object} statics - object with static methods
 * @param  {object} proto - object with prototype functions.
 * @return {function} jig   - namespace of a jig
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
    var tempGlobal, last;
    tempGlobal = global;
    if (typeof namespace === 'string') {
        var namespaces = namespace.split(".");
        var stringsGiven = namespaces.length;
        last = stringsGiven - 1;
        /**For every str in namespace, check if it is already a namespace
         in global. If not, create it**/
        for (var i = 0; i < stringsGiven - 1; i++) {
            if (typeof tempGlobal[namespaces[i]] === 'undefined') {
                tempGlobal[namespaces[i]] = function () {
                };
            }
            tempGlobal = tempGlobal[namespaces[i]];
        }
        parent = global[namespaces[0]];//First namespace mentioned.
        tempGlobal[namespaces[last]] = tempGlobal[namespaces[last]] || function () {
            };
        jig =  tempGlobal[namespaces[last]];
    }
    /**If there is not a name, create jig**/
    jig = jig || function(){};

    /**add static methods to jig.**/
    if (typeof statics === 'object') {
        var methods, j;
        methods = Object.keys(statics);
        j = methods.length;
        while (j--) {
            jig[methods[j]] = statics[methods[j]];
        }
    }


    jig.init = jig.init || function () {
        };
    jig.setup = jig.setup || function () {
        };


    /**add prototype methods to jig**/
    extend(jig.prototype, proto);

    ////////////////DONT FORGET!!

    jig.prototype.init = jig.prototype.init || function () {
        };
    /**make sure there are prototype default & plugin Objects**/
    jig.prototype.default = jig.prototype.default || {};
    jig.prototype.plugins = jig.prototype.plugins || {};

    jig.init();
    jig.setup();


    //REMINDER: program, so default object merges with one passed
    //at instatiation.

    if (typeof parent !== 'undefined') {
        jig = parent;
    }
    return jig;
}





