/**
 * Created by developer on 12.06.15.
 */

var React = require("react");

function ReactView(reactComponent){
    this.reactComponent = reactComponent;
}

ReactView.prototype.render = function(data){
    this.reactComponent.init(data);
};


module.exports = {
    beforeInit: function (jig, pluginName) {
        // dynamic requiring does not work at all with browserify.
        // this.reactComponent = require('./../react/' + jig.defaults.view.view);
        // REACT COMPONENT FOR test/reactView-test.js
        //this.reactComponent = require('./react-test');
        // REACT COMPONENT FOR example/client/reactChat.js
        // this.reactComponent = require('./../react/reactChat');
        jig.plugins[pluginName] = new ReactView(jig.defaults.view);
    },
    create: function(reactView){
        return React.createClass(reactView);
    }
};
