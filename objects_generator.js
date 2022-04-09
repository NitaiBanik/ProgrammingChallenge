var fs = require('fs');

var detector= require('./object_type_detector');

var min_length = 4;
var max_length = 16;
var totalBytes = 2*1000*1000; 

const alphabets ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphanumerics ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const integers ='0123456789';


function generate(fileName, reportFileName, report){

    var path = __dirname + '/files/' + fileName;
    resetPreviouslyGeneratedObjects(path);

    console.log(`Generating objects another file ${path}, ${JSON.stringify(report)}`);
    
    var total_objects = "";

    while(totalBytes >= min_length){
        var length_of_object = generate_length_of_object();
        var length = Math.min(length_of_object, totalBytes);

        var object = generate_single_object(length);

        report = detector.detect(report, object);

        total_objects += (object + ", ");
        totalBytes -= length;
    }

    total_objects = total_objects.slice(0, -2);
    fs.writeFile(path, total_objects, (err) => {
        if (err) throw err;
        console.log('Objects Generated Successfully!');
      });

      var reportFilePath = __dirname + '/files/' + reportFileName;
  
      fs.writeFile(reportFilePath, JSON.stringify(report), (err) => {
          if (err)
              throw err;
          console.log('Report file has been updated!');
      }); 
}

function resetPreviouslyGeneratedObjects(path) {
    fs.writeFile(path, "", (error) => {
        if (error)
            throw error;
    });
}

function generate_single_object(length){
    var object_type =  Math.floor(Math.random() * 4);

    if(object_type == 0)
        return generate_alphabetical_string(length);
    
    if(object_type == 1)
        return generate_alphanumerics(length);
    
    if(object_type == 2)
        return generate_integers(length);

    if(object_type == 3)
        return generate_real_numbers(length);

    throw console.error("Invalid object type");
}

function generate_length_of_object() {
    var random_number = Math.random();
    var length = random_number * (max_length - min_length + 1) + min_length;

    return Math.floor(length);
}

function generate_integers(length){
    var object = "";
    
    for(var i = 0 ; i < length; i++)
         object += integers.charAt(Math.floor(Math.random() * integers.length));

    return object;
 }

 function generate_alphabetical_string(length){
    var object = "";
    
    for(var i = 0 ; i < length; i++)
         object += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    
    return object;
 }

 function generate_alphanumerics(length){
    var object = "";
    
    for(var i = 0 ; i < length; i++)
         object += alphanumerics.charAt(Math.floor(Math.random() * alphanumerics.length));
    
    return object;
 }

 function generate_real_numbers(length){
    var object = "";
    var position_to_put_dot = Math.floor(Math.random() * (length - 2)) + 1;

    for(var i = 0 ; i < length; i++){
        if(i == position_to_put_dot)
            object += '.';
        else
            object += integers.charAt(Math.floor(Math.random() * integers.length));
    }
    return object;
 }

 module.exports = {generate};
 