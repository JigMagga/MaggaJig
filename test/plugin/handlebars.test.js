var Handlebars = require("./../../plugins/handlebars");
var Jig = require('jig.js');

describe('handlebars', function () {
    it('handlebars', function () {
        var Jig = require('jig.js');
        var template = "./../examples/templates/handlebars.hbs";
        var viewData = {
            "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]
        };
        Jig.create('Test.Namespace', {
            defaults: {
                view: {
                    element: ".my-class",
                    template: template
                }
            },
            plugins: {
                view: Handlebars
            }
        }, {
            init: function () {
                // that function gets called in instanciation with "new" operator
                this.plugins.view.render(viewData);
            }
        });
        var jigInstance = new Test.Namespace();
        Handlebars.init(jigInstance);
        Handlebars.render(viewData);
    });
});