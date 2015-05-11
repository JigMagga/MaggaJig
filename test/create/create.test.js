describe('jig create test', function () {
  var Jig = require(__base + "Jig")

  // // Before Hooks
  // before(function (done) {
    
  // });

  // beforeEach(function (done) {
    
  // });

  // Tests
  it('should create namespace', function () {
    
    Jig.create("Test.Namespace", {});

    assert.notEqual(typeof Test, "undefined", "Global namespace was created");
    assert.notEqual(typeof Test !== "undefined" && typeof Test.Namespace, "undefined", "Global deep namespace was created");

  });


  // // After Hooks
  // afterEach(function (done) {
    
  // });

  // after(function (done) {
    
  // });
});