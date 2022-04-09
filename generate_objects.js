var fs = require('fs');
var min_length = 4;
var max_length = 16;

const alphabets ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphanumerics ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const integers ='0123456789';


function generate(fileName, report){

    var path = __dirname + '/files/' + fileName;
    console.log(`Generating objects another file ${path}, ${JSON.stringify(report)}`);
    resetPreviouslyGeneratedObjects(path);

    var x = 10;
    while(x--){
        var object = generate_single_object();
        console.log(object);
    }

}

module.exports = {generate};

function resetPreviouslyGeneratedObjects(path) {
    fs.writeFile(path, "", (error) => {
        if (error)
            throw error;
    });
}

function generate_single_object(){
   var object = "";
   var length =  generate_length_of_object();
   
   for(var i = 0 ; i < length; i++){
        object += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   
   return object;
}

function generate_length_of_object() {
    var random_number = Math.random();
    var length = random_number * (max_length - min_length + 1) + min_length;
    return Math.floor(length);
}

function generate_integers(){
    var object = "";
    var length =  generate_length_of_object();
    
    for(var i = 0 ; i < length; i++){
         object += integers.charAt(Math.floor(Math.random() * integers.length));
    }
    
    return object;
 }

 function generate_integers(){
    var object = "";
    var length =  generate_length_of_object();
    
    for(var i = 0 ; i < length; i++){
         object += integers.charAt(Math.floor(Math.random() * integers.length));
    }
    
    return object;
 }

 function generate_alphabetical_string(){
    var object = "";
    var length =  generate_length_of_object();
    
    for(var i = 0 ; i < length; i++){
         object += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
    }
    
    return object;
 }

 function generate_alphanumerics(){
    var object = "";
    var length =  generate_length_of_object();
    
    for(var i = 0 ; i < length; i++){
         object += alphanumerics.charAt(Math.floor(Math.random() * alphanumerics.length));
    }
    
    return object;
 }

 function generate_real_numbers(){
    var object = "";
    var length =  generate_length_of_object();
    
    for(var i = 0 ; i < length; i++){
         object += integers.charAt(Math.floor(Math.random() * integers.length));
    }

    var position_to_put_dot = Math.floor(Math.random() * (length - 2));

    object[position_to_put_dot] = '.';
    
    return object;
 }