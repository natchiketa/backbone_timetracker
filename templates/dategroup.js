(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['dategroup'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing;


  buffer += "<dt>\n    <div class=\"dategroup\">";
  stack1 = depth0.date;
  foundHelper = helpers.dateformat;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "{Dow} {Mon} {ord}", {hash:{}}) : helperMissing.call(depth0, "dateformat", stack1, "{Dow} {Mon} {ord}", {hash:{}});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>\n</dt>";
  return buffer;});
})();