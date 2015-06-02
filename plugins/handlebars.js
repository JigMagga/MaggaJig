// plugin in Jig/plugins/handlebars.js

module.exports = {
    init: function(jig){
        console.log("in-init");
        this.jig = jig;
    },
    render: function(data){
        console.log("in-render");
        //var b = browserify("./index.js");
        var templatePath = this.jig.defaults.view.template;
        var template = require(templatePath);
        var html = template({ name: "Epeli" });
        console.log(html);

        if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
            // node
            // element will be a reference to a document
            // this.jig.defaults.view.element.insert(result);
        }else{
            document.querySelector(this.jig.defaults.view.element).insertHTML = result;
        }
    }
};