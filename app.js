var http = require('http');

var dateTime = require('./datetimemodule');

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write("The time is now is: " + dateTime.myDateTime());
}).listen(6030);