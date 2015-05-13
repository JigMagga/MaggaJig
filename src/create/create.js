/**
 * [exports description]
 * @param  {[type]} namespace [description]
 * @param  {[type]} static    [description]
 * @param  {[type]} proto     [description]
 * @return {[type]}           [description]
 */
module.exports = function create(namespace, static, proto){


    /*Arguments can be ("JigName", {}, {},), [args->case1]
     *              or ("JigName", {}) -> Object is proto [args->case2]
     *              or ({}) -> proto [args->case3]
     */

    /*Check JigName input*/

    var namespace_andJigName = namespace.split(".");
    var stringsInJigName = namespace_andJigName.length;
    var actualJigName, jig;
    // TODO you can have many levels go through it with a loop
    // Pseudocode 
    // var tmpVar = global;
    // for(splitArray){
    // 
    // 	if(!tempVar[currentLoopVar]){
    // 		tempVar[currentLoopVar] = {};
    // 	}
    // 
    // }
    // 
    // 
    switch (stringsInJigName) {
        case 1: //only name of Jig
            actualJigName = namespace_andJigName[0];
            break;
        case 2: //both namespace and name of Jig
            jig = namespace_andJigName[0];
            actualJigName = namespace_andJigName[1];
            break;
        default://no namespace or name of Jig
            break;
    }

    /*If the namespace does not exist, create it and assign actualJigName to it.*/
    if (typeof jig === 'undefined') {
        jig = {};
        jig.name = actualJigName;
    }

    //add static to namespace
    if (typeof proto != 'undefined') {//[args->case1]
        static.map(
            function (method) {
                return addMethods(method, jig, false);
            }
        );
    }
    else {//[args->case2
        proto = static;
    }

    //add proto as prototype Methods to namespace
    proto.map(
        function (method) {
            return addMethods(method, jig, true);
        }
    );

    //make sure that there are static && prototype init methods
    if (typeof jig.init == 'undefined') {
        jig.init = {};
    }
    if (typeof jig.prototype.init === 'undefined') {
        jig.prototype.init = {};
    }

    //make sure there are prototype default & plugin Objects
    if(typeof jig.prototype.default === 'undefined'){
        jig.prototype.default = {};
    }
    if(typeof jig.prototype.plugin === 'undefined'){
        jig.prototype.plugin = {};
    }

    return namespace;



}


/**
 * Helper to add methodes
 * @param {[type]}  method      [description]
 * @param {[type]}  namespace   [description]
 * @param {Boolean} isPrototype [description]
 */
function addMethods(method, namespace, isPrototype) {
    "use strict";
    var methodName = method.name;
    if (typeof namespace.method == 'undefined' && isPrototype) {
    	// TODO you do not need to assigne an object first 
    	// Also that will not work because you will assigne every time on the same property name -> you need namespace.prototype[methodName] =
        namespace.prototype.methodName = {};
        namespace.prototype.methodName = method;
    }
    else {
        namespace.methodName = {};
        namespace.methodName = method;
    }
}