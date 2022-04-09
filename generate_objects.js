function generate(fileName, report){

    var path = __dirname + '/files/' + fileName;
    console.log(`Generating objects another file ${path}, ${JSON.stringify(report)}`);
}

module.exports = {generate};