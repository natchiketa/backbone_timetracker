/* Development server
(needs connect module—do `npm install connect`, non-global install)
Hey, Don't use on production, okay? */
var connect = require('connect');
connect.createServer(
    connect.static(__dirname + '/../')
).listen(8080);