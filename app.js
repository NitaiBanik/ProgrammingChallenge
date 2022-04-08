const express = require('express');
const app = express();

const port = 6030;
const fileName = "objects.txt";

app.use('/files/download', express.static('files'));

app.get('/ping', (request, response) => {
    response.send("Ping");
})

app.get('/generate', (request, response) => {
    
    generateObjects();

    var host = request.get('host');
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.end(JSON.stringify({downloadUrl: host + "/files/download/" +  fileName}));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

function generateObjects(){
    console.log("Generating objects");
}