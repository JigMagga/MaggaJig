/**
 * [exports description]
 * @param  {object} hooks     Extra functions to be added in the jig.
 * @return {function}         It returns the namespace with the hooks added.
 */


module.exports = function plugin(hooks) {
    /*eslint-disable */
    extend = require('util')._extend;
    /*eslint-enable */
    extend(this.plugins, hooks);

    if (hooks.init) {
        hooks.init();
    }
    if (hooks.setup) {
        this.on('setup', hooks.setup);
    }
    if (hooks.preInit) {
        this.on('preInit', hooks.preInit);
    }
    if (hooks.postInit) {
        this.on('postInit', hooks.postInit);
    }
};
