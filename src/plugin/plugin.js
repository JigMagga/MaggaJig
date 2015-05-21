/**
 * [exports description]
 * @param  {string} namespace One (or a concatenation) of namespaces.
 * @param  {object} hooks     Extra functions to be added in the jig.
 * @return {function}         It returns the namespace with the hooks added.
 */

/*eslint-disable */
var extend = require('util')._extend;
/*eslint-enable */


module.exports = function plugin(hooks) {
    this.on('setup', hooks.preSetup);
    this.on('preInit', hooks.preInit);
    this.on('postInit', hooks.postInit);
};
