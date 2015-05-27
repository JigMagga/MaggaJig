describe('jig create test', function () {
    var Jig = require('jig.js');

    // Tests
     it('should create namespace', function () {

     Jig.create('Test.Namespace', {});

     assert.notEqual(typeof Test, 'undefined', 'Global namespace was created');
     assert.notEqual(typeof Test.Namespace, 'undefined', 'Global deep namespace was created');

     });

    it('should create prototype', function () {

        Jig.create('Test.Namespace', {
            staticFN: function () {
            }
        }, {
            prototypefn: function () {
            }
        });
        var testInstance = new Test.Namespace({
            view: function () {
                console.log(2);
            }
        });
        var test2 = new Test.Namespace({
            view: function () {
                console.log(2);
            }
        });
        /*var testa = new Object(function a() {
            console.log(3);
        });
        var testo = new Object(function a() {
            console.log(3);
        });*/

        // chai.expect(testInstance).to.eql(test2); //false
        // chai.expect(testa).to.equal(testo); //also false
        chai.assert.isFunction(testInstance.__proto__.prototypefn, 'Prototype function was created');
        chai.assert.isFunction(testInstance.defaults.view, 'Prototype function was created at instatiation');
        chai.assert.isNotFunction(Test.Namespace.prototypefn, 'Prototype is not assign to static type');
        chai.assert.isFunction(Test.Namespace.prototype.prototypefn, 'Prototype function was created');


    });
    it('should work with deep namespace', function () {

        Jig.create('Test.Namespace.Deep', {});

        assert.notEqual(typeof Test, 'undefined', 'Global namespace was created');
        assert.notEqual(typeof Test.Namespace, 'undefined', 'Global deep namespace was created');
        assert.notEqual(typeof Test.Namespace.Deep, 'undefined', 'Global deep namespace was created');

    });

    it('should create static type', function () {

        Jig.create('Test.Namespace', {
            staticFN: function () {
            }
        }, {});
        chai.assert.isFunction(Test.Namespace.staticFN, 'Static function was created');
    });


    it('should work without namespace', function () {

        var MyJig = Jig.create({});

        assert.notEqual(typeof MyJig, 'undefined', 'Jig was created');

    });

    it('should create static type, without a namespace', function () {

        var myJig = Jig.create({
            staticFN: function () {
            }
        }, {});
        chai.assert.isFunction(myJig.staticFN, 'Static function was created');
    });
    it('should call setup and init', function () {

        var setupFn = sinon.spy();
        var initFn = sinon.spy();
        var MyJig = Jig.create({
            setup: setupFn,
            init: initFn
        }, {});
        var testInstance = new MyJig();

        chai.expect(setupFn.called).to.be.true;
        chai.expect(initFn.called).to.be.true;
    });

    it('should inherit create function', function () {
        var MyParentJig = Jig.create({});
        var MyChildJig = MyParentJig.create({});

        chai.assert.isFunction(MyChildJig.create, "create function inherited.");
    });

    it('should inherit statics and prototypes', function () {
        var MyParentJig = Jig.create({
            parent: function () {
            }
        }, {
            protoparent: function () {
            }
        });
        var MyChildJig = MyParentJig.create({
            child: function () {
            }
        }, {});

        chai.assert.isFunction(MyChildJig.parent, 'Static function was inherited');
        chai.assert.isFunction(MyChildJig.prototype.protoparent, 'Prototype function was inherited');
        chai.assert.isFunction(MyChildJig.child, 'Static function was created');
    });
});
