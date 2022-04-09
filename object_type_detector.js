function detect(report, object){

    var total_alphabets = 0;
    var total_numbers = 0;
    var total_dots = 0;

    for(var chr in object){
        if(isNumber(chr))
            total_numbers++;
        else if(isAlpha(chr))
            total_alphabets++;
        else if(isDot(chr))
            total_dots++;
        else 
            console.error(`Invalid character: ${chr}`);
    }

    if(total_alphabets == object.length)
        report.Alphabetical_Strings++;
    else if(total_numbers == object.length)
        report.Integers++;
    else if(total_dots == 1 && total_numbers == object.length - 1)
        report.Real_Numbers++;
    else if((total_dots + total_numbers) == object.length)
        report.Alphanumerics++;
    else
        console.error(`Invalid object: ${object}`);
    return report;
}

function isNumber(chr){
    return chr >= '0' && chr <= '9';
}

function isAlpha(chr){
    return (chr >= 'A' && chr <= 'Z') || (chr >= 'a' && chr <= 'z');
}

function isDot(chr){
    return chr == '.';
}


module.exports = {object_type_detector};