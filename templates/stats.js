(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['stats'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<ul id=\"filters\">\n    <li>\n        <a class=\"selected\" href=\"#/\">All</a>\n    </li>\n    <li>\n        <a href=\"#/completed\">Completed</a>\n    </li>\n</ul>\n\n<div id=\"rounding\" class=\"btn-group\" data-toggle=\"buttons-radio\">\n    <button type=\"button\" class=\"btn btn-mini btn-primary\" data-roundamt=\"1\">Exact time</button>\n    <button type=\"button\" class=\"btn btn-mini btn-primary\" data-roundamt=\"15\">Nearest 15 minutes</button>\n    <button type=\"button\" class=\"btn btn-mini btn-primary\" data-roundamt=\"30\">Nearest 30 minutes</button>\n</div>";});
})();