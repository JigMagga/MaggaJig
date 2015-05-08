(function () {
    var Jig = require("./export.js")
 
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return Jig;
        });
    }
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = Jig;
    }
    else {
        this.Jig = Jig;
    }
}.call(this));