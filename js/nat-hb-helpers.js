Handlebars.registerHelper('ternary', function(condition, valIfTrue, valIfFalse) {
    return condition ? new Handlebars.SafeString(valIfTrue) : new Handlebars.SafeString(valIfFalse);
});

Handlebars.registerHelper('pluralize', function(amount, singular, plural) {
    return (amount === 1) ? new Handlebars.SafeString(singular) : new Handlebars.SafeString(plural);
});

// Uses the SugarJS create() and format() utility method to format a date. The date argument can be an
// instance of Date, or anything else that Date.create() uses. See http://sugarjs.com/dates for more.
Handlebars.registerHelper('dateformat', function(date, formatstring) {
    formatstring = (typeof formatstring != 'string') ? '{12hr}:{mm}:{ss} {tt}' : formatstring;
    return new Handlebars.SafeString(Date.create(date).format(formatstring));
});

Handlebars.registerHelper('totalHours', function(hours, rndAmt) {
    rndAmt = (typeof rndAmt == 'undefined') ? false : rndAmt;
    return new Handlebars.SafeString(rndAmt? ((hours / rndAmt).round() * (rndAmt / 60)) : (hours / 60));
});