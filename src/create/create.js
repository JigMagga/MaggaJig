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
    var EventEmitter = require('events').EventEmitter;
    var jig,
        namespaces,
        i,
        len,
        fn = function () {
        },
        tempGlobal = global;

    function extend(origin, add) {
        var keys,
            z;
        // Do nothing if add is undefined
        if (!add) {
            return origin;
        }
        origin = origin || {};
        keys = Object.keys(add);
        z = keys.length;
        while (z--) {
            origin[keys[z]] = add[keys[z]];
        }
        return origin;
    }

    function extendMixins(origin,mixins) {
        for (var i = 0; i < mixins.length; i++) {
            var mixinsToMerge = {};
            if(mixins[i].prototype !== undefined){
                mixins[i] = mixins[i].prototype;
            }

            for (var func in mixins[i]) {
                if (typeof origin[func] === 'undefined') {
                    mixinsToMerge[func] = mixins[i][func];
                }
            }

            return extend(origin, mixinsToMerge);
        }
    }

    // Find out which arguments are given
    if (typeof proto === 'undefined') {
        // Arguments are ("namespace", {}), or ({},{})
        if (typeof statics !== 'undefined') {
            proto = statics;
            statics = typeof namespace === 'string' ? null : namespace;
            // Argument is ({})
        } else {
            proto = namespace;
        }
    }

    // create Jig constructor
    jig = function (defaults, plugins) {
        extend(this, proto);
        /*eslint-disable */
        this._eventEmitter = new EventEmitter();
        /*eslint-enable */
        this.defaults = extend(defaults, this.defaults);
        this.plugins = extend(plugins, this.plugins);

        this.emit('setup');
        this.setup(this.defaults);
        this.emit('preInit');
        this.init();
        this.emit('postInit');
    };

    // Arguments are ("namespace", {}, {},)
    if (typeof namespace === 'string') {
        namespaces = namespace.split('.');
        // For every str in namespace, check if it is already a namespace
        // in global. If not, create it, and assign last one to jig
        for (i = 0, len = namespaces.length - 1; i < len; i++) {
            if (!tempGlobal[namespaces[i]]) {
                tempGlobal[namespaces[i]] = fn;
            }
            tempGlobal = tempGlobal[namespaces[i]];
        }
        tempGlobal[namespaces[namespaces.length - 1]] = jig;
    }

    //var Parent = function () {};
    //Parent.prototype = this;
    jig.prototype = new this();

    jig.prototype.emit = function (event, data) {
        /**eslint-disable **/
        this._eventEmitter.emit(event, data);
        /** eslint-enable **/
    };
    jig.prototype.on = function (event, action) {
        /**eslint-disable **/
        this._eventEmitter.on(event, action);
        /** eslint-enable **/
    };

    // inherit from parent Jig and add static methods to jig

    extend(jig, this);
    extend(jig, statics);



    // make sure the is a plugins, defaults object, and static init function
    jig.plugins = jig.plugins || {};
    jig.defaults = jig.defaults || {};
    jig.init = jig.init || fn;

    // inherit static methods from parent Jig (except static init)
    if (statics) {
        delete  statics.init;
    }
    extend(jig.prototype, statics);

    if(statics){
        if(typeof statics.mixins !== 'undefined'){
            extendMixins(jig, statics.mixins);
            delete jig.mixins;
        }
    }

    jig.setup();
    jig.init();

    return jig;
};
