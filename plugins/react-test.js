/**
 * Created by developer on 05.06.15.
 */
var React = require('react');

module.exports = {
    display: React.createClass({
        displayName: 'Restaurants',
        render: function () {
            return (
                React.createElement('div', null,
                    'The restaurant name is ', this.props.name,
                    ', and its location is ', this.props.location)
            );
        }
    }),
    init: function (DEFAULTS) {
        React.render(
            React.createElement(this.display, {
                name: DEFAULTS.restaurant.name,
                location: DEFAULTS.restaurant.location
            }),
            document.getElementById(DEFAULTS.view.element));
    }
};
