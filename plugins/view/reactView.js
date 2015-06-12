/**
 * Created by developer on 12.06.15.
 */
module.exports = {
    afterCreate: function (jig) {
        // dynamic requiring does not work at all with browserify.
        // this.reactComponent = require('./../react/' + jig.defaults.view.view);
        // REACT COMPONENT FOR test/reactView-test.js
        // this.reactComponent = require('./../react/react-test');
        // REACT COMPONENT FOR example/client/reactChat.js
        this.reactComponent = require('./../react/reactChat');
    },
    init: function (data) {
        this.reactComponent.render(data);
    }
};

