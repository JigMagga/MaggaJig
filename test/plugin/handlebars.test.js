var Handlebars = require("./../../plugins/handlebars");
var Jig = require('jig.js');
var path = require("path");

describe('handlebars', function () {
    var templatesPath = path.join(__dirname,"..","..","examples","templates","handlebars.hbs");
    it('should be cool', function () {
        Jig.create(
            'Test.Namespace',
            {
                defaults: {
                    view: {
                        element: ".my-class",
                        template: templatesPath
                    }
                },
                plugins: {
                    view: Handlebars
                }
            },
            {
                init: function () {
                    // that function gets called in instanciation with "new" operator
                    this.plugins.view.render(someDateForTheView);
                }
            }
        );
        var jigInstance = new Test.Namespace();
        Handlebars.init(jigInstance);
        Handlebars.render({
            "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]
        });
    })
});