describe('jig create test', function() {
  //TODO we should use a other way 
  var Jig = require("jig.js");

  // Tests
  it('should create namespace', function() {

    Jig.create("Test.Namespace", {});

    assert.notEqual(typeof Test, "undefined", "Global namespace was created");
    assert.notEqual(typeof Test !== "undefined" && typeof Test.Namespace, "undefined", "Global deep namespace was created");

  });

  it('should work without namespace', function() {

    var MyJig = Jig.create({});

    assert.notEqual(typeof MyJig, "undefined", "Jig was created");

  });


  it('should work with deep namespace', function() {


    Jig.create("Test.Namespace.Deep", {});

    assert.notEqual(typeof Test, "undefined", "Global namespace was created");
    assert.notEqual(typeof Test.Namespace, "undefined", "Global deep namespace was created");
    assert.notEqual(typeof Test.Namespace.Deep, "undefined", "Global deep namespace was created");

  });

  it('should create static type', function() {

    Jig.create("Test.Namespace", {
      staticFN: function() {}
    }, {});
    chai.isFunction(Test.Namespace.staticFN, "Static function was created");

  });

  it('should create prototype', function() {

    Jig.create("Test.Namespace", {
      staticFN: function() {}
    }, {
      prototypefn: function() {}
    });
    var testInstance = new Test.Namespace();
    chai.isFunction(testInstance.prototypefn, 'Prototype function was created');
    chai.isNotFunction(Test.Namespace.prototypefn, "Prototype is not assign to static type");
    chai.isFunction(Test.Namespace.prototype.prototypefn, "Prototype function was created");


  });


  it('should call setup and init', function() {
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

it('should inheritance create function', function() {
    var MyParentJig = Jig.create({});
    var MyChildJig = MyParentJig.create({});

  });





});