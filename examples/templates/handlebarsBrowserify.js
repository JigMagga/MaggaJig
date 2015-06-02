var Handlebars = require("handlebars");
var source = require("./template.hbs");

var template = Handlebars.compile(source);
var html = template({ name: "Epeli" });

document.write(html);
//console.log(html);

