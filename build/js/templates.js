this["handlebars"] = this["handlebars"] || {};
this["handlebars"]["template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "        <li>"
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + " is "
    + alias3(((helper = (helper = helpers.age || (depth0 != null ? depth0.age : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"age","hash":{},"data":data}) : helper)))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, buffer = 
  "<p>Hello, my name is "
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + ". I am from "
    + alias3(((helper = (helper = helpers.hometown || (depth0 != null ? depth0.hometown : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"hometown","hash":{},"data":data}) : helper)))
    + ". I have\n    "
    + alias3(this.lambda(((stack1 = (depth0 != null ? depth0.kids : depth0)) != null ? stack1.length : stack1), depth0))
    + " kids:\n</p>\n<ul>\n";
  stack1 = ((helper = (helper = helpers.kids || (depth0 != null ? depth0.kids : depth0)) != null ? helper : alias1),(options={"name":"kids","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.kids) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</ul>";
},"useData":true});