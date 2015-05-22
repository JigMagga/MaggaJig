describe('jig plugin test', function () {
    var Jig = require("jig.js");

    // Tests
    it('should create plugin', function () {

        Jig.create('Test.Namespace', {
            staticFN: function () {
            }
        }, {
            prototypefn: function () {
            }
        });
        Test.Namespace.plugin({
            init: function () {
                console.log("TEST");
            }
        });

        new Test.Namespace();
    });
    it('Pass plugins in the jig', function () {

        Jig.create('Test.Namespace', {
            plugins: {
                myPlug: function () {
                }
            }
        }, {});

        var test = Test.Namespace();

        chai.assert.isFunction(Test.Namespace.plugins.myPlug, 'Plugins were extended');
        chai.assert.isFunction(test.myPlug, 'Plugins inherited a instatiation');
    });


});
