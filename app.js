const express = require('express');
const app = express();

const port = 6030;
const fileName = "objects.txt";

app.get('/ping', (request, response) => {
    response.send("Ping");
})

app.get('/files/' + fileName, (request, response, next) => {
    var path = __dirname + '/files/' + fileName;
    console.log(path);
    response.download(path);
    return;
})

app.get('/generate', (request, response) => {
    
    generateObjects();

    var host = request.get('host');
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.end(JSON.stringify({downloadUrl: host + "/files/" +  fileName}));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

function generateObjects(){
    console.log("Generating objects");
}