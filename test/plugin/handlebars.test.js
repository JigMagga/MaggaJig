var Handlebars = require('./../../plugins/handlebars');
var Jig = require('jig.js');

describe('handlebars', function () {
    it('handlebars', function () {
        var Jig = require('jig.js');
        var template = './../examples/templates/template.hbs';
        var elementName = '.my-class';
        var jigInstance;
        var viewData = {
            kids: [{name: 'Jimmy', age: '12'}, {name: 'Sally', age: '4'}]
        };
        Jig.create('Test.Namespace', {
            defaults: {
                view: {
                    element: elementName,
                    template: template
                }
            },
            plugins: {
                view: Handlebars
            }
        }, {
            init: function () {
                // functions gets called in instantiation with 'new' operator
                this.plugins.view.init(this);
                this.plugins.view.render(viewData);
            }
        });
        jigInstance = new Test.Namespace();
        Handlebars.init(jigInstance);
        Handlebars.render(viewData);
    });
});