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
        tempGlobal = global;

    function extend(origin, add) {
        var keys,
            z;
        // Do nothing if add is undefined
        if (!add) {
            return origin;
        }
        keys = Object.keys(add);
        z = keys.length;
        while (z--) {
            origin[keys[z]] = add[keys[z]];
        }
        return origin;
    }

    //Find out which arguments are given
    if (typeof proto === 'undefined') {
        //Arguments are ("namespace", {}), or ({},{})
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
        //console.log("this in constructor Scope", this);
        //inherit static methods from this.
        extend(this, this.__proto__.constructor);
        /*eslint-disable */
        this._eventEmitter = new EventEmitter();
        /*eslint-enable */
        this.defaults = extend({}, defaults);
        extend(this.defaults, this.constructor.defaults);
        this.plugins = extend({}, plugins);
        extend(this.plugins, this.constructor.plugins);
        //and  (change here influences plugin.test.js)
        //extend(this, this.plugins); //plugins are also staticMethods then.
        this.emit('setup');
        this.setup(defaults);
        this.emit('preInit');
        this.init();
        this.emit('postInit');
    };

    //Arguments are ("namespace", {}, {},)
    if (typeof namespace === 'string') {
        namespaces = namespace.split('.');
        //For every str in namespace, check if it is already a namespace
        // in global. If not, create it, and assign last one to jig
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

    //inherit from parent Jig and add static methods to jig
    extend(jig, this);
    extend(jig, statics);

    //inherit from parent Jig and add prototype methods to jig
    extend(jig.prototype, this.prototype);
    extend(jig.prototype, proto);

    jig.setup();
    jig.init();

    return jig;
}
;
