describe('jig create test', function () {
    //TODO we should use another way
    var Jig = require("jig.js");
    var global = this;
    // Tests
    it('should create namespace', function () {

        var Test = Jig.create("Test.Namespace", {});

        assert.notEqual(typeof Test, "undefined", "Global namespace was created");
        assert.notEqual(typeof Test !== "undefined" && typeof Test.Namespace, "undefined", "Global deep namespace was created");

    });

    it('should create static type', function () {

        var Test = Jig.create("Test.Namespace", {
            staticFN: function () {
            }
        }, {});
        //chai.isFunction(Test.Namespace.staticFN, "Static function was created");

        //chai.isFunction does not work. But with assert, one can see, that it is
        //a function.
        assert.equal(typeof Test.Namespace.staticFN, "function", "Static function was created");
    });

    it('should create prototype', function () {

        Test = Jig.create("Test.Namespace", {
            staticFN: function () {
            }
        }, {
            prototypefn: function () {
            }
        });
        var testInstance = new Test.Namespace();
        //chai.isFunction(testInstance.prototypefn, 'Prototype function was created');
        assert.equal(typeof testInstance.prototypefn, "function", "'Prototype function was created'");
        //chai.isNotFunction(Test.Namespace.prototypefn, "Prototype is not assign to static type");
        //chai.isFunction(Test.Namespace.prototype.prototypefn, "Prototype function was created");


    });

    it('should work without namespace', function () {

       var MyJig =  Jig.create({});

        assert.notEqual(typeof MyJig, "undefined", "Jig was created");

    });


    it('should work with deep namespace', function () {

        Jig.create("Test.Namespace.Deep", {});

        assert.notEqual(typeof Test, "undefined", "Global namespace was created");
        assert.notEqual(typeof Test.Namespace, "undefined", "Global deep namespace was created");
        assert.notEqual(typeof Test.Namespace.Deep, "undefined", "Global deep namespace was created");

    });



    it('should create static type, without a namespace', function () {

        Jig.create({
            staticFN: function () {
            }
        }, {});
        chai.isFunction(global.staticFN, "Static function was created");

    });


    it('should call setup and init', function () {
        var setupFn = sinon.spy();
        var initFn = sinon.spy();
        var MyJig = Jig.create({
            setup: setupFn,
            init: initFn
        });

        chai.expect(setupFn.called).to.be.true;
        chai.expect(initFn.called).to.be.true;

        var testInstance = new MyJig();

    });

    it('should inheritance create function', function () {
        var MyParentJig = Jig.create({});
        var MyChildJig = MyParentJig.create({});

    });
});
