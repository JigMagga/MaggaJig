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
            init : function(){
                console.log("TEST");
            }
        });

        new Test.Namespace();

    });

    //it('should merge plugins with object given at instatiation', function () {
    //
    //    Jig.plugin("Merge.Hooks", {
    //        init: function () {
    //        },
    //        // setup function is called before instantiation
    //        preSetup: function () {
    //        }
    //    });
    //
    //    var instanceOfMerge = new Merge.Hooks({}, {view: function(){}});
    //    //chai.assert.isFunction(instanceOfMerge.plugins.view, "merge completed");
    //});
});
