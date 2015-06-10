/**
 * Created by developer on 05.06.15.
 */
module.exports = function reactView(jig) {
    // get the react super plugin to render content.
    var reactPlugin = require('./../plugins/reactPlugin_ForTest');
    // listen for 'jig_render' event coming from jig.
    // Then, execute init function with emitted object.
    jig.on('jig_render', function (data) {
        reactPlugin.init(data);
    });
};
