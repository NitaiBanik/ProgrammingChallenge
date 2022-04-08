const  http = require('http');
const fs = require('fs');

const port = 6030;

http.createServer((request, response) => {
    fs.readFile('objects.txt', (err, data) => {
        response.writeHead(200, {'Content-Type': 'text/json'});
        response.write(data);
        response.end();
});
}).listen(port, () =>{
    console.log(`Server started on port: ${port}`);
});