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


module.exports = function create(namespace, statics, proto) {
    var EventEmitter = require('events').EventEmitter,
    /*eslint-disable */
        extend = require('util')._extend;
    /*eslint-enable */
    var jig,
        namespaces,
        i,
        len,
        proto2Inherit,
        statics2Inherit,
        tempGlobal = global,
        fn = function () {
        };
    /** Collect static and  prototype methods to inherit **/
    proto2Inherit = this.prototype || {};
    statics2Inherit = Object.keys(this);

    /** Find out which arguments are given**/
    if (typeof proto === 'undefined') {
        /** Arguments are ("namespace", {}), or ({},{})**/
        if (typeof statics !== 'undefined') {
            proto = statics;
            statics = typeof namespace === 'string' ? null : namespace;
            /** Argument is ({})**/
        } else {
            proto = namespace;
        }
    }
    console.log("statics", statics2Inherit);
    /** create Jig constructor**/
    jig = function (defaults, plugins) {
        /*eslint-disable */
        this._eventEmitter = new EventEmitter();
        /*eslint-enable */
        this.emit('setup');
        this.setup(defaults, plugins);
        this.defaults = extend({}, this.constructor.defaults, defaults);
        this.plugins = extend({}, this.constructor.plugins, plugins);
        this.emit('preInit');
        this.init();
        this.emit('postInit');
    };

    /** 1: Arguments are ("namespace", {}, {},) . Create
     non existing namespaces and assign last one to jig.**/
    if (typeof namespace === 'string') {
        namespaces = namespace.split('.');
        /** For every str in namespace, check if it is already a namespace
         in global. If not, create it**/
        for (i = 0, len = namespaces.length - 1; i < len; i++) {
            if (!tempGlobal[namespaces[i]]) {
                tempGlobal[namespaces[i]] = {};
            }
            tempGlobal = tempGlobal[namespaces[i]];

        }
        tempGlobal[namespaces[namespaces.length - 1]] = jig;
    }

    jig.prototype.emit = function (event, data) {
        /**eslint-disable **/
        this._eventEmitter.emit(event, data);
        /** eslint-enable **/
    };

    /**add static methods to jig and inherit from parent Jig**/
    extend(jig, statics);

    /**extend needs an object as second argument, and
     'this' is not an object, so I recreated 'extend' for functions.**/
    i = statics2Inherit.length;
    while (i--) {
        jig[statics2Inherit[i]] = this[statics2Inherit[i]];
    }

    jig.init = jig.init || fn;
    jig.setup = jig.setup || fn;

    //**add prototype methods to jig and inherit from parent Jig **/
    extend(jig.prototype, proto);
    extend(jig.prototype, proto2Inherit);


    jig.prototype.init = jig.prototype.init || fn;
    jig.prototype.setup = jig.prototype.setup || fn;

    /** make sure there are default & plugin Objects **/
    jig.default = jig.default || {};
    jig.plugins = jig.plugins || {};
    /**TODO should setup() and init() be called only at instantiation?,
     * TODO or also (here) when creating the namespace?.**/
    /*jig.setup();
     jig.init(); */

    return jig;
};
