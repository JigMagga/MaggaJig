/**
 * Created by lfcj on May, 2015
 */


var Jig = require("jig.js");
var extend = require('util')._extend;

function plugin(jigName, extension) {

    /**case 1: JigName doesn't exist -> create it.**/

    if (typeof Jig.jigName !== 'object') {//jigName does not exists
        namespaceGenerator.create(jigName, extension);
        /**case 2: JigName exists -> add extension to it.**/
    } else {
        extend(jigName.__proto__.plugins, extenstion);
    }
}
