var generator= require('./generateobjects');

const express = require('express');
const app = express();

const port = 6030;
const fileName = "objects.txt";

app.get('/ping', (request, response) => {
    response.send("Ping");
})

app.get('/files/' + fileName, (request, response) => {
    var path = __dirname + '/files/' + fileName;

    console.log('downloading file: ' + fileName);
    response.download(path, fileName, (error) => {
        if(!error) return;
        if(error.status !== 404){
            response.statusCode = 500;
            response.end("Error downloading file");
        }
        else{
            response.statusCode = 404;
            response.end(`File ${fileName} not found`);
        }
    });
});

app.get('/generate', (request, response) => {
    
    generator.generate(fileName);

    var host = request.get('host');
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.end(JSON.stringify({downloadUrl: host + "/files/" +  fileName}));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});