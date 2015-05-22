/**
 *
 * @param defaults
 * @returns {object}
 * @constructor
 */
function Jig() {

}

/**
 * [create description]
 * @type {[type]}
 */
Jig.create = require('./create/create.js');


/**
 * [create description]
 * @type {[type]}
 */
Jig.setup = require('./setup/setup.js');

/**
 * [create description]
 * @type {[type]}
 */
Jig.init = function () {

};

/** @type {[type]} [description] */
Jig.plugin = require('./plugin/plugin.js');

/** @type {[type]} [description] */
Jig.prototype.plugin = require('./plugin/plugin.js');

/**
 *
 */
Jig.prototype.setup = function () {

};

/**
 *
 */
Jig.prototype.init = function () {

};

module.exports = Jig;
