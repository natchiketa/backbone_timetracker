(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"view\">\n    <input class=\"toggle\" type=\"checkbox\" ";
  stack1 = depth0.completed;
  foundHelper = helpers.ternary;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "checked", "", {hash:{}}) : helperMissing.call(depth0, "ternary", stack1, "checked", "", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "> <!-- <%= completed ? 'checked' : '' %>-->\n    <label>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label>\n    <button class=\"destroy\"></button>\n</div>\n<input class=\"edit\" value=\"";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  return buffer;});
})();