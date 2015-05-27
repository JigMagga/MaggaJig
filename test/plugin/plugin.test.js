describe('jig plugin test', function () {
    var Jig = require('jig.js');
    var test, Nspace;

    // Tests
    it('should create plugin', function () {
        Jig.create('Test.Namespace', {
            staticFN: function () {
            }
        }, {
            prototypefn: function () {
            }
        });
        // output in console: TEST
        Test.Namespace.plugin({
            init: function () {
                console.log('TEST');
            }
        });
        // 2nd output of TEST in console
        Test.Namespace.plugins.init();
        // 3rd output of TEST in console
        test = new Test.Namespace();
        test.plugins.init();
    });
    it('Pass plugins in the jig', function () {
        Jig.create('Test.Namespace', {
            plugins: {
                myPlug: function () {
                }
            }
        }, {});

        // When calling Test.Namespace(), test inherits from Test
        // instead of from Namespace, because this=Test
        Nspace = Test.Namespace;
        test = new Nspace();

        chai.assert.isFunction(Test.Namespace.plugins.myPlug, 'Plugins were extended');
        chai.assert.isFunction(test.plugins.myPlug, 'Plugins inherited a instatiation');
    });

});
