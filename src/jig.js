/*
 * Taken and adopted from jQuery.extend function
 *
 * Changes
 *
 * 1. No checking for plain object (see jquery.isPlainObject)
 * 2. dont uses jQuery function isArray
 *
 * */


function extend() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;

        // Skip the boolean and the target
        target = arguments[i] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object") {
        target = {};
    }

    // Extend Jig itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (typeof copy === "object") && (copy !== null) || (copyIsArray = Array.prototype.isArray(copy))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.prototype.isArray(src) ? src : [];

                    } else {
                        clone = src && ((typeof src === "object") && (src !== null)) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[name] = extend(deep, clone, copy);

                    // Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}

/**
 * Creates a namespace for a jig with statics as static methods,
 * and proto as prototype methods.
 * @param  {string} namespace - name of the existing/or to be created namespace.
 * @param  {object} statics - object with static methods
 * @param  {object} proto - object with prototype functions.
 * @return {function} jig   - jig prototype
 * Arguments can be ("namespace", {}, {},),
 *              or ("namespace", {}) -> Object is proto
 *              or ({}) -> proto
 *              or ({},{}) -> statics and proto.
 *    "namespace" can be a concatenation of strings (deep namespace)
 **/

var Jig = Object.create({
     create: function(namespace, statics, instance) {
         var globalRef, jigConstructor;

         globalRef = global || window;

         // prepare arguments
         if (typeof instance === 'undefined') {
             if (typeof namespace === 'string') {
                 // ("namespace", {}) -> Object is proto
                 instance = statics;
                 statics = {};
             }
             else {
                 if (typeof statics === 'undefined') {
                     // ({}) -> proto
                     instance = namespace;
                     statics = {};
                     namespace = null;
                 }
                 else {
                     // ({},{}) -> statics and proto.
                     instance = statics;
                     statics = namespace;
                     namespace = null;
                 }
             }
         }

         if (namespace) {
             jigConstructor = globalRef;
             // build a reference on jig constructor if 'some.nested.namespace' provided then
             // build object some.nested.namespace if it partially exist then reuse it
             jigConstructor = namespace.split('.').reduce(function(prev, item ){
                 if (!jigConstructor[item]) {
                     jigConstructor[item] = {};
                 }
                 return jigConstructor[item];
             }, jigConstructor);
         }

         var F = function(){
         };
         F.prototype = Jig;
         F.prototype.extend = extend;

         extend(true, F.prototype, statics);

         // constructor
         jigConstructor = function(runtimeInstance){
             this.extend(true, instance, runtimeInstance);
             if (typeof this.init === 'function') {
                 this.init();
             }
         };
         jigConstructor.prototype = new F();
         jigConstructor.prototype.constructor = jigConstructor;
         jigConstructor.static = statics;
         return jigConstructor;
     }
}
);

/**
 * [create description]
 * @type {[type]}
 */
//Jig.create = require('./create/create.js');


/**
 * [create description]
 * @type {[type]}
 */
//Jig.setup = require('./setup/setup.js');

/**
 * [create description]
 * @type {[type]}
 */
//Jig.init = require('./init/init.js');

/** @type {[type]} [description] */
//Jig.plugin = require('./plugin/plugin.js');



// ***** Prototype ******


/** @type {[type]} [description] */
//Jig.prototype.plugin = require('./plugin/plugin.js');

/**
 *
 */
//Jig.prototype.setup = require('./setup/setup.js');

/**
 *
 */
//Jig.prototype.init = require('./init/init.js');



module.exports = Jig;
