(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"view\">\n    <div class=\"itemstate\"><i class=\"";
  stack1 = depth0.completed;
  foundHelper = helpers.ternary;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "icon-ok", "icon-time", {hash:{}}) : helperMissing.call(depth0, "ternary", stack1, "icon-ok", "icon-time", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\"></i></div>\n    <div class=\"timevals\">\n        <div class=\"timeval-grp\">\n            <div class=\"start timestamp tb-label \">";
  stack1 = depth0.start;
  foundHelper = helpers.dateformat;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dateformat", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n            <input class=\"edit\" type=\"text\" data-target-attr=\"start\">\n        </div>\n        <div class=\"timeval-grp\">\n            <div class=\"stop timestamp tb-label ";
  stack1 = depth0.completed;
  foundHelper = helpers.ternary;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "", "running", {hash:{}}) : helperMissing.call(depth0, "ternary", stack1, "", "running", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.stop;
  foundHelper = helpers.dateformat;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dateformat", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n            <input class=\"edit\" type=\"text\" data-target-attr=\"stop\">\n        </div>\n        <div class=\"description timeval-grp\">\n            <i class=\"icon-info-sign\"></i>\n            <label class=\"desclabel tb-label\" for=\"description\">";
  foundHelper = helpers.description;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label>\n            <input class=\"edit\" name=\"description\" type=\"text\" data-target-attr=\"description\">\n        </div>\n        <div class=\"totalhrs\">";
  foundHelper = helpers.totalHrs;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.totalHrs; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.totalHrs;
  foundHelper = helpers.pluralize;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "hr", "hrs", {hash:{}}) : helperMissing.call(depth0, "pluralize", stack1, "hr", "hrs", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    </div>\n    <button class=\"destroy\"></button>\n</div>\n";
  return buffer;});
})();