describe('jig create test', function () {
    var Jig = require('jig.js');

    // Tests
    it('should create namespace', function () {
        Jig.create('Test.Namespace', {});

        assert.notEqual(typeof Test, 'undefined', 'Global namespace was created');
        assert.notEqual(typeof Test.Namespace, 'undefined', 'Global deep namespace was created');
    });

    it('should create prototype', function () {
        var testInstance;
        // test2;
        Jig.create('Test.Namespace', {
            staticFN: function () {
            }
        }, {
            prototypefn: function () {
            }
        });
        testInstance = new Test.Namespace({
            view: function () {
                console.log(2);
            }
        });
        /*test2 = new Test.Namespace({
         view: function () {
         console.log(2);
         }
         });
         var test3 = new Object(function a() {
         console.log(3);
         });
         var test4 = new Object(function a() {
         console.log(3);
         });

         chai.expect(testInstance).to.eql(test2); //false
         chai.expect(test3).to.equal(test4); //also false*/
        chai.assert.isFunction(testInstance.prototypefn, 'Prototype function was created');
        chai.assert.isFunction(testInstance.defaults.view, 'Defaults object merged');
        chai.assert.isNotFunction(Test.Namespace.prototypefn, 'Prototypefn not assigned as static');
        chai.assert.isFunction(Test.Namespace.prototype.prototypefn, 'Prototype func was created');
    });

    it('should work with deep namespace', function () {
        Jig.create('Test.Namespace.Deep', {});

        assert.notEqual(typeof Test, 'undefined', 'Global namespace was created');
        assert.notEqual(typeof Test.Namespace, 'undefined', 'Global deep namespace was created');
        assert.notEqual(typeof Test.Namespace.Deep, 'undefined', 'Global Deep namespace created');
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

        chai.assert.isFunction(MyChildJig.create, 'create function inherited.');
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
        chai.assert.isFunction(MyChildJig.prototype.protoparent, 'Prototype function inherited');
        chai.assert.isFunction(MyChildJig.child, 'Static function was created');
    });

    it.only('handlebars', function () {
        var Jig = require('jig.js');
        var path = require("path");

        var Handlebars = require("../../plugins/handlebars.js");
        console.log(Handlebars);
        var templatesPath = "../examples/templates/handlebars.hbs";
        Jig.create('Test.Namespace', {
            defaults: {
                view: {
                    element: ".my-class",
                    template: templatesPath
                }
            },
            plugins: {
                view: Handlebars
            }
        }, {
            init: function () {
                // that function gets called in instanciation with "new" operator
                this.plugins.view.render(someDateForTheView);
            }
        });
        var jigInstance = new Test.Namespace();
        Handlebars.init(jigInstance);
        Handlebars.render({
            "name": "Alan", "hometown": "Somewhere, TX",
            "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]
        });
    });
});