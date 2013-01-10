(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['stats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n    <button class=\"btn btn-mini\" id=\"clear-completed\">Clear completed (";
  foundHelper = helpers.completed;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.completed; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</button>\n";
  return buffer;}

  buffer += "<span id=\"todo-count\"><strong>";
  foundHelper = helpers.remaining;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.remaining; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</strong> ";
  stack1 = depth0.remaining;
  foundHelper = helpers.pluralize;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "item", "items", {hash:{}}) : helperMissing.call(depth0, "pluralize", stack1, "item", "items", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " left</span>\n<ul id=\"filters\">\n    <li>\n        <a class=\"selected\" href=\"#/\">All</a>\n    </li>\n    <li>\n        <a href=\"#/completed\">Completed</a>\n    </li>\n</ul>\n";
  stack1 = depth0.completed;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n";
  return buffer;});
})();