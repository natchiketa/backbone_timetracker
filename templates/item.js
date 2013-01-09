(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"view\">\n    <div class=\"timevals\">\n        <div class=\"start timestamp\">";
  stack1 = depth0.start;
  foundHelper = helpers.dateformat;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dateformat", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n        <div class=\"stop timestamp ";
  stack1 = depth0.completed;
  foundHelper = helpers.ternary;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "", "running", {hash:{}}) : helperMissing.call(depth0, "ternary", stack1, "", "running", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.stop;
  foundHelper = helpers.dateformat;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dateformat", stack1, {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n    </div>\n    <button class=\"destroy\"></button>\n</div>\n";
  return buffer;});
})();