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
        var test = new Test.Namespace();
        //new Test.Namespace(); //TODO This should cause a 2nd TEST output.
    });
    it('Pass plugins in the jig', function () {

        Jig.create('Test.Namespace', {
            plugins: {
                myPlug: function () {
                }
            }
        }, {});

        var nspace; //When calling Test.Namespace(), test inherits from Test
        nspace = Test.Namespace;//instead of from Namespace, because this=Test
        var test = new nspace();

        chai.assert.isFunction(Test.Namespace.plugins.myPlug, 'Plugins were extended');
        chai.assert.isFunction(test.plugins.myPlug, 'Plugins inherited a instatiation');
        //or, if plugins are also static Methods:
        //chai.assert.isFunction(test.myPlug, 'Plugins inherited a instatiation');
    });

});
