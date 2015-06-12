/**
 * Created by developer on 05.06.15.
 */
// ReactView = require('./reactView.js');
describe('ReactView Layer:', function () {
    it('renders default object', function () {
        var Jig = require('jig.js');
        var reactView = require('./../../plugins/reactView');
        var restaurantsInfo = { name: 'Ivy', location: 'Disneyland, FL'};
        // create element in DOM to insert new data.
        var elementName = '.react-test';
        var element = document.createElement('div');
        var jigInstance;
        element.id = elementName.slice(1);
        element.className += elementName.slice(1);
        document.body.appendChild(element);
        Jig.create('Test.Namespace', {
            defaults: {
                view: {
                    element: element.id
                },
                restaurant: restaurantsInfo
            },
            plugins: {
                view: reactView
            }
        }, {});
        jigInstance = new Test.Namespace();
        jigInstance.render();
    });
});
