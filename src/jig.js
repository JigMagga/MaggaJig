/*
 * Taken and adopted from jQuery.extend function
 *
 * Changes
 *
 * 1. No checking for plain object (see jquery.isPlainObject)
 * 2. dont uses jQuery functions
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
    if (typeof target !== "object" && deep) {
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
                if (deep && copy && (typeof copy === "object") && (copy !== null) || (copyIsArray = Array.isArray(copy))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

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
/*
 * From Douglas Crockford
 *
 * */

function inherits(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F()
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

/*
 * Adopted from javascript.ru
 *
 * */

function mixin(dst, src){
    var tobj = {};
    for(var x in src){
        // also we ignore superclass property altogether with Object properties
        if (src.hasOwnProperty(x) && x !=='superclass') {
            if((typeof tobj[x] == "undefined") || (tobj[x] != src[x])){
                dst[x] = src[x];
            }
        }
    }
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

var Jig = Object.create(Object,{
    create: {
        enumerable: true,
        value: function (namespace, statics, prototype) {
            var ref, jigConstructor;

            // prepare arguments
            if (typeof prototype === 'undefined') {
                if (typeof namespace === 'string') {
                    // ("namespace", {}) -> Object is proto
                    prototype = statics;
                    statics = {};
                }
                else {
                    if (typeof statics === 'undefined') {
                        // ({}) -> proto
                        prototype = namespace;
                        statics = {};
                        namespace = null;
                    }
                    else {
                        // ({},{}) -> statics and proto.
                        prototype = statics;
                        statics = namespace;
                        namespace = null;
                    }
                }
            }

            // constructor
            jigConstructor = function (runtimeInstance) {
                var self = this;

                jigConstructor.superclass.constructor.call(self, runtimeInstance);

                // taking  and extending "defaults" from prototype
                self.defaults = extend(true, {}, self.defaults, runtimeInstance);

                if (typeof self.setup === 'function') {
                    self.setup();
                }

                if (typeof self.init === 'function') {
                    self.init();
                }
                return self;
            };

            // add inheritance for proper prototype chain.
            inherits(jigConstructor,this);
            extend(true, jigConstructor.prototype, prototype);

            // move all properties of parent constructor to child constructor
            mixin(jigConstructor, this);
            extend(jigConstructor, statics);

            // namespace
            if (namespace) {
                ref = global || window;
                // build a reference on jig constructor if 'some.nested.namespace' provided then
                // build object some.nested.namespace if it partially exist then reuse it
                namespace.split('.').reduce(function(prev, item ){
                    if (!prev[item]) {
                        prev[item] = {};
                    }
                    ref = prev;
                    name = item;
                    return prev[item];
                }, ref);
                ref[name] = jigConstructor;
            }

            if (typeof jigConstructor.init === 'function') {
                jigConstructor.init();
            }

            return jigConstructor;
        }
    },
    newInstance: {
        enumerable: true,
        value: function () {
            var constructor = this,
                instance;

            // TODO: make it possible to start with any number of arguments
            instance = new constructor(arguments[0]);

            return instance;
        }
    }
});


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
Jig.plugin = require('./plugin/plugin.js');



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
