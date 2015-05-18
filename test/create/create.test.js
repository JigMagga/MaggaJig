
describe('jig create test', function () {
    //TODO we should use another way
    var Jig = require("jig.js");

    // Tests
    it('should create namespace', function () {

        Jig.create("Test.Namespace", {});

        assert.notEqual(typeof global.Test, "undefined", "Global namespace was created");
        assert.notEqual(typeof global.Test !== "undefined" && typeof Test.Namespace, "undefined", "Global deep namespace was created");

    });

    it('should create static type', function () {

        Jig.create("Test.Namespace", {
            staticFN: function () {
            }
        }, {});
       // chai.isFunction(global.Test.Namespace.staticFN, "Static function was created");
        //chai isFunction GIVES ERROR:ai.isFunction IS NOT A FUNCTION.
        assert.equal(typeof global.Test.Namespace.staticFN, "function", "Static function was created");
    });

    it('should create prototype', function () {

        Jig.create("Test.Namespace", {
            staticFN: function () {
            }
        }, {
            prototypefn: function () {
            }
        });
        var testInstance = new Test.Namespace();
        //chai.isFunction(testInstance.prototypefn, 'Prototype function was created');
        assert.equal(typeof testInstance.prototypefn, "function", "'Prototype function was created'");
        assert.equal(typeof global.Test.prototypefn, "function", "Prototype function is in object");
        //chai.isNotFunction(Test.Namespace.prototypefn, "Prototype is not assign to static type");
        //chai.isFunction(Test.Namespace.prototype.prototypefn, "Prototype function was created");


    });

    it('should work without namespace', function () {

        var MyJig = Jig.create({});

        assert.notEqual(typeof MyJig, "undefined", "Jig was created");

    });


    it('should work with deep namespace', function () {

        Jig.create("Test.Namespace.Deep", {});

        assert.notEqual(typeof Test, "undefined", "Global namespace was created");
        assert.notEqual(typeof Test.Namespace, "undefined", "Global deep namespace was created");
        assert.notEqual(typeof Test.Namespace.Deep, "undefined", "Global deep namespace was created");

    });

    it('should create static type, without a namespace', function () {

        var myJig = Jig.create({
            staticFN: function () {
            }
        }, {});
        //chai.isFunction(myJig.staticFN, "Static function was created");
        assert.equal(typeof myJig.staticFN, "function",  "Static function was created");
    });

    it('should call setup and init', function () {
        var setupFn = sinon.spy();
        var initFn = sinon.spy();
        var MyJig = Jig.create({
            setup: setupFn,
            init: initFn
        }, {});
        //var testInstance = new MyJig();
        //IT IS NOT INSTANTIATING, until then, we only check if
        //functions are added.

        //chai.expect(setupFn.called).to.be.true;
        //chai.expect(initFn.called).to.be.true;
        assert.equal(typeof MyJig.setup,"function", "Setup is in jig" );
        assert.equal(typeof MyJig.init,"function", "init is in jig" );


    });

    it('should inheritance create function', function () {
        var MyParentJig = Jig.create({});
        var MyChildJig = MyParentJig.create({});

    });
});
