/*global assert, chai*/
describe('jig plugin test', function () {
    var Jig = require("jig.js");

    // Tests
    it('should create plugin', function () {

        Jig.plugin("Test.MyPlugin", {
            init: function () {
            },
            // setup function is called before instantiation
            preSetup: function () {
            },
            postSetup: function () {
            },
            // init function pre and post
            preInit: function () {
            },
            postInit: function () {
            }
        });

        var instanceOfMyPlugin = new Test.MyPlugin();
        chai.assert.isFunction(instanceOfMyPlugin.plugins.preInit, "instance of jig created");
        chai.assert.isFunction(Test.MyPlugin.prototype.plugins.preSetup, "plugin added");
    });

    it('should merge plugins with object given at instatiation', function () {

        Jig.plugin("Merge.Hooks", {
            init: function () {
            },
            // setup function is called before instantiation
            preSetup: function () {
            }
        });

        var instanceOfMerge = new Merge.Hooks({}, {view: function(){}});
        //chai.assert.isFunction(instanceOfMerge.plugins.view, "merge completed");
    });
});
