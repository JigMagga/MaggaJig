/**
 * Creates a namespace for a jig with statics as static methods,
 * and proto as prototype methods.
 * @param  {string} namespace - name of the existing/or to be created namespace.
 * @param  {object} statics - object with static methods
 * @param  {object} proto - object with prototype functions.
 * @return {object} jig   - namespace of a jig
 **/

var extend;
extend = require('util')._extend;
var global = this;

module.exports = function create(namespace, statics, proto) {

    'use strict'
    /**Arguments can be ("namespace", {}, {},),
     *              or ("namespace", {}) -> Object is proto
     *              or ({}) -> proto
     *              or ({},{}) -> statics and proto.
     *    "JigName" can be str.str.str.str...actualName
     **/

    /**1: Create an object in global called Jigs thtat will contain namespaces.**/

    if (typeof global["Jigs"] === 'undefined') {
        global["Jigs"] = {};
    }

    /**2: Check if there is a JigName, and if  it is deep (str.str...). Create
     non existing namespaces and assign them to jig. **/
    var actualJigName, jig, actualNamespace, parent;
    if (typeof namespace === 'string') {//there is a namespace given
        var namespaces = namespace.split(".");
        var stringsGiven = namespaces.length;

        switch (stringsGiven) {
        /**only name of a Jig is given**/
            case 1:
                actualJigName = namespaces[0];

                /**create namespace if it does not exist.**/
                if (typeof global.Jigs[actualJigName] === 'undefined') {
                    global.Jigs[actualJigName] = {};
                }
                jig = global.Jigs[actualJigName];
                break;
            /**both namespace and name of Jig**/
            case 2:
                actualNamespace = namespaces[0];
                actualJigName = namespaces[1];

                /**create namespace if it does not exist.**/
                if (typeof global.Jigs[actualNamespace] === 'undefined') {
                    global.Jigs[actualNamespace] = {};
                    global.Jigs[actualNamespace].name = actualNamespace;
                    global.Jigs[actualNamespace][actualJigName] = {};
                } else if (typeof global.Jigs[actualNamespace][actualJigName] === 'undefined') {
                    global.Jigs[actualNamespace][actualJigName] = {};
                }
                parent = global.Jigs[actualNamespace];
                jig = global.Jigs[actualNamespace][actualJigName];
                jig.name = actualJigName;
                break;
            /**in case a deep namespace is given**/
            default:
                var tempGlobal, i, last;
                tempGlobal = global["Jigs"];
                last = stringsGiven - 1;
                /**stringsGiven = [nSpc1, nSpc2,...,nSpcN]. Check if nSpc1 is in
                 global, and in general if namespace nSpcX+1 is in namespace
                 nSpcX  **/
                for (i = 0; i < stringsGiven - 1; i++) {
                    if (typeof tempGlobal[namespaces[i]] === 'undefined') {
                        tempGlobal[namespaces[i]]= {};
                        tempGlobal[namespaces[i]].name = namespaces[i];
                    }
                    tempGlobal = tempGlobal[namespaces[i]];
                }
                last = i;
                parent = global.Jigs[namespaces[0]];//First namespace mentioned.
                if (typeof tempGlobal[namespaces[last]] === 'undefined') {
                    tempGlobal[namespaces[last]] = {};
                }
                jig = tempGlobal[namespaces[last]];
                jig.name = namespaces[last];
                break;
        }
        /**Arguments are (namespace, {})**/
        if (typeof proto === 'undefined') {
            proto = statics;

            /**add proto as prototype Methods to namespace**/
            extend(jig.__proto__, proto);
            /**Arguments are (namespace, {},{})**/
        } else {
            /**add statics and proto to namespace**/
            extend(jig, statics);
            extend(jig.__proto__, proto);
        }

    } else {/**create namespace, without name given
     NEEDS TO BE IMPLEMENTED. OPTIONS:
     1. Create a default object in global["Jigs"] that
     contains all methods outside of a particular Jig.
     2. Just extend those methods inside of global["Jigs"]
     (probably messy).
     **/
        if (typeof proto == 'undefined') { //Argument is ({})
            proto = statics;
            //ADD PROTOS TO BE IMPLEMENTED
            /**Arguments are ({},{})**/
        } else {
            //ADD STATIC AND PROTO TO BE IMPLEMENTED
        }
    }

    /**make sure that there are statics && prototype init methods**/
    if (typeof jig.init === 'undefined') {
        jig.init = {};
    }

    if (typeof jig.__proto__.init === 'undefined') {
        jig.__proto__.init = {};
    }

    /**make sure there are prototype default & plugin Objects**/
    if (typeof jig.__proto__.default === 'undefined') {
        jig.__proto__.default = {};
    }
    if (typeof jig.__proto__.plugin === 'undefined') {
        jig.__proto__.plugin = {};
    }
    if (typeof parent !== 'undefined') {
        jig = parent;
    }

    return jig;
}




