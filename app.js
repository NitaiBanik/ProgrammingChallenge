const express = require('express');
const app = express();

const port = 6030;
const fileName = "objects.txt";
const reportFileName = "report.json";

const generator = require('./objects_generator');
const fs = require('fs');

app.get('/ping', (request, response) => {
    response.end("Pong");
})

app.get('/generate', (request, response) => {

    let report = resetReport();
    generator.generate(fileName, reportFileName, report);

    let host = request.get('host');
    response.end(JSON.stringify({ downloadUrl: host + "/files/" + fileName }));
})


app.get('/files/' + fileName, (request, response) => {
    let path = __dirname + '/files/' + fileName;

    console.log('downloading file: ' + fileName);
    response.download(path, fileName, (error) => {
        if (!error) return;
        if (error.status !== 404) {
            response.statusCode = 500;
            response.end("Error downloading file!");
        }
        else {
            response.statusCode = 404;
            response.end(`File ${fileName} not found`);
        }
    });
});

app.get('/report', (request, response) => {
    let path = __dirname + '/files/' + reportFileName;

    fs.readFile(path, (error, result) => {
        if (!error) {
            let reportData = JSON.parse(result);
            response.end(JSON.stringify(reportData));
        }
        else if (error.status !== 404) {
            response.statusCode = 500;
            response.end("Error getting report");
        }
        else {
            response.statusCode = 404;
            response.end(`Report not found`);
        }
    });
});

app.listen(port, () => {
    resetReport();
    generator.reset_previously_generated_objects(fileName);
    console.log(`Server is listening on port ${port}`);
});

function resetReport() {
    let path = __dirname + '/files/' + reportFileName;

    let report = {
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

