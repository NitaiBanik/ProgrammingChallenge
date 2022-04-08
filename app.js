var http = require('http');
http.createServer((request, response) => {
 response.end('Hello world from programming challenge.\n');
}).listen(6030);