var generator= require('./generate_objects');
var fs = require('fs');

const express = require('express');
const app = express();

const port = 6030;
const fileName = "objects.txt";
const reportFileName = "report.json";

app.get('/ping', (request, response) => {
    response.end("Ping");
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

    var report = resetReport();
    generator.generate(fileName, report);

    var host = request.get('host');
    response.writeHead(200, {'Content-Type': 'text/json'});
    response.end(JSON.stringify({downloadUrl: host + "/files/" +  fileName}));
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.get('/report', (request, response) => {
    var path = __dirname + '/files/' + reportFileName;
    
    fs.readFile(path, (error, result) =>{
        if(!error){
            var reportData = JSON.parse(result);
            response.end(JSON.stringify(reportData));
        }
        else if(error.status !== 404){
            response.statusCode = 500;
            response.end("Error getting report");
        }
        else{
            response.statusCode = 404;
            response.end(`Report not found`);
        }
    });
});

function resetReport() {
    var path = __dirname + '/files/' + reportFileName;

    var report = {
        "Alphabetical_Strings": 0,
        "Real_Numbers": 0,
        "Integers": 0,
        "Alphanumerics": 0
    };

    fs.writeFile(path, JSON.stringify(report), (err) => {
        if (err)
            throw err;
        console.log('Report file has been reset!');
    });

    return report;
}
