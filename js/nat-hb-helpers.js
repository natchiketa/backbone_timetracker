Handlebars.registerHelper('ternary', function(condition, valIfTrue, valIfFalse) {
    return condition ? new Handlebars.SafeString(valIfTrue) : new Handlebars.SafeString(valIfFalse);
});

Handlebars.registerHelper('pluralize', function(amount, singular, plural) {
    return (amount === 1) ? new Handlebars.SafeString(singular) : new Handlebars.SafeString(plural);
});