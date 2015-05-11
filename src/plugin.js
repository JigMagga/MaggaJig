/**
 * Created by lfcj on May, 2015
 */


var Jig = require("MaggaJig");
var namespaceGenerator = require("namespaceGenerator");

function plugin(jigName, extension) {

    //case 1: JigName doesn't exist -> create it.

    if (typeof Jig.jigName !== 'object') {//jigName does not exists
        namespaceGenerator.create(jigName, extension);

    } else {//case 2: JigName exists -> add extension to it.
        extension.map(
            function (method) {
            addMethods(method, jigName.prototype.plugins, false);
        })
    }
}

function addMethods(method, namespace, isPrototype) {
    "use strict";
    var methodName = method.name;
    if (typeof namespace.method == 'undefined' && isPrototype) {
        namespace.prototype.methodName = {};
        namespace.prototype.methodName = method;
    }
    else {
        namespace.methodName = {};
        namespace.methodName = method;
    }
}