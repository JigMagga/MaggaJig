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
        chai.assert.isFunction(testInstance.prototypefn, 'Prototype function was created');
        chai.assert.isFunction(testInstance.defaults.view, 'Defaults object merged');
        chai.assert.isNotFunction(Test.Namespace.prototypefn, 'Prototypefn not assigned as static');
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
        var initFn = sinon.spy();
        var MyJig = Jig.create({
            init: initFn
        });
        var testInstance = new MyJig();
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
        var instanceOfChild = new MyChildJig();

        chai.assert.isFunction(MyChildJig.parent, 'Static function was inherited');
        chai.assert.isFunction(instanceOfChild.protoparent, 'Prototype function inherited');
        chai.assert.isFunction(MyChildJig.child, 'Static function was created');
    });
    it('static init gets called at creation, prototype init at instatiation', function () {
        Jig.create('Test.Namespace', {
            init: function () {
                this.test = 'static init';
            }
        }, {
            init: function () {
                this.test = 'prototype init';
            }
        });
        // console.log();
        assert.equal(Test.Namespace.test, 'static init');
        // Instantiate, next init should be prototype init
//        var myInstance = new Test.Namespace();
        // console.log();
        assert.equal(new Test.Namespace().test, 'prototype init');
    });
    it('should call beforeCreate and afterCreate hooks of plugin', function () {
        var plugin = {
                beforeCreate: sinon.spy(),
                afterCreate: sinon.spy()
            },
            JigConstructor = Jig.create({
                    plugins: {
                        plugin: plugin
                    }
                },
                {});
        chai.expect(plugin.beforeCreate.called).to.be.true;
        chai.expect(plugin.afterCreate.called).to.be.true;
    });
    it('should call beforeInit and afterInit hooks of plugin', function () {
        var plugin = {
                beforeInit: sinon.spy(),
                afterInit: sinon.spy()
            },
            init = sinon.spy(),
            JigConstructor = Jig.create({
                plugins: {
                    plugin: plugin
                },
                init: init
            }),
            jigInstance;
        jigInstance = new JigConstructor();
        chai.expect(plugin.beforeInit.called).to.be.true;
        chai.expect(plugin.afterInit.called).to.be.true;
        chai.expect(init.called).to.be.true;
    });

    it('should not call init if defaults.init = false', function () {
        var plugin = {
                beforeInit: sinon.spy(),
                afterInit: sinon.spy()
            },
            init = sinon.spy(),
            JigConstructor = Jig.create({
                plugins: {
                    plugin: plugin
                },
                init: init
            }),
            jigInstance;
        jigInstance = new JigConstructor({
            init: false
        });
        chai.expect(plugin.beforeInit.called).to.be.true;
        chai.expect(plugin.afterInit.called).to.be.true;
        chai.expect(init.called).to.be.false;
    });
});
