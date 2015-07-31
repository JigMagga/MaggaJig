// ***** Prototype ******
function JigProto() {
}

/** @type {[type]} [description] */

JigProto.prototype.plugin = require('./plugin/plugin.js');


// ***** Factory ******
var Jig = Object.create(JigProto, {
    create: {
        enumerable: true,
        value: require('./create/create.js')
    },
    plugin: {
        enumerable: true,
        value: require('./plugin/plugin.js')
    }
});

module.exports = Jig;
