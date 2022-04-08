const  http = require('http');
const fs = require('fs');
const url = require('url');

const port = 6030;

http.createServer((request, response) => {
    var params = url.parse(request.url, true);
    var filename = "." + params.pathname;
    fs.readFile(filename, function(error, texts) {
      if (error) {
        console.log(error);
        response.writeHead(404, {'Content-Type': 'text/html'});
        return response.end("404 fffffffNot Found");
      } 
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(texts);
      return response.end();
    });
}).listen(port, () =>{
    console.log(`Server started on port: ${port}`);
});