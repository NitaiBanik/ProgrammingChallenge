const  http = require('http');
const url = require('url');

const port = 6030;

http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/html'});
    var params = url.parse(request.url, true).query;
    response.end(params.day + " " + params.month);
}).listen(port, () =>{
    console.log(`Server started on port: ${port}`);
});