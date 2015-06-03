Handlebars = require("handlebars");

module.exports = {
    init: function(jig){
        this.jig = jig;
    },
    render: function(data){
        var templatePath = this.jig.defaults.view.template;
        var elementName = this.jig.defaults.view.element;

        if (typeof process !== 'undefined' && ("" + process.title).search("node") !== -1) {
            var template = require(templatePath);
            var html = template(data);
            // element will be a reference to a document
            elementName.insert(html);
        }else{
            var templates = require("../build/js/templates.js");
            var html = templates["MyApp"]["templates"]["handlebars"](data);

            var element = document.createElement('div');
            element.className += elementName.slice(1);
            document.body.appendChild(element);

            document.querySelector(elementName).innerHTML += html;
        }
    }
};