describe('jig plugin test', function() {
  //TODO we should use a other way 
  var Jig = require("jig.js");

  // Tests
  it('should create plugin', function() {

    Jig.plugin("Jig.MyPlugin", {
      init: function() {},
      // setup function is called before instantiation
      preSetup: function() {},
      postSetup: function() {},
        // init function pre and post
      preInit: function() {},
      postInit: function() {}
    });


  });



});