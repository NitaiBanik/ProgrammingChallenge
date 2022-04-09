const fs = require('fs');
const detector = require('./object_type_detector');

const min_length = 4;
const max_length = 16;

const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const alphanumerics = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const integers = '0123456789';


function generate(fileName, reportFileName, report) {
    reset_previously_generated_objects(fileName);

    let path = __dirname + '/files/' + fileName;

    console.log(`Generating objects another file ${path}, ${JSON.stringify(report)}`);

    let total_objects = "";

    let totalBytes = 2 * 1000 * 1000;

    while (totalBytes >= min_length) {
        let length_of_object = generate_length_of_object();
        let length = Math.min(length_of_object, totalBytes);

        let object = generate_single_object(length);

        report = detector.detect(report, object);

        total_objects += (object + ", ");
        totalBytes -= length;
    }

    total_objects = total_objects.slice(0, -2);
    fs.writeFile(path, total_objects, (err) => {
        if (err) throw err;
        console.log('Objects Generated Successfully!');
    });

    let reportFilePath = __dirname + '/files/' + reportFileName;

    fs.writeFile(reportFilePath, JSON.stringify(report), (err) => {
        if (err)
            throw err;
        console.log('Report file has been updated!');
    });
}

function reset_previously_generated_objects(fileName) {
    let path = __dirname + '/files/' + fileName;
    fs.writeFile(path, "", (error) => {
        if (error)
            throw error;
    });
}

function generate_single_object(length) {
    let object_type = Math.floor(Math.random() * 4);

    if (object_type == 0)
        return generate_alphabetical_string(length);

    if (object_type == 1)
        return generate_alphanumerics(length);

    if (object_type == 2)
        return generate_integers(length);

    if (object_type == 3)
        return generate_real_numbers(length);

    throw console.error("Invalid object type");
}

function generate_length_of_object() {
    let random_number = Math.random();
    let length = random_number * (max_length - min_length + 1) + min_length;

    return Math.floor(length);
}

function generate_integers(length) {
    let object = "";

    for (let i = 0; i < length; i++)
        object += get_random_character(integers);

    return object;
}

function generate_alphabetical_string(length) {
    let object = "";

    for (let i = 0; i < length; i++)
        object += get_random_character(alphabets);

    return object;
}

function generate_alphanumerics(length) {
    let object = "";

    for (let i = 0; i < length; i++)
        object += get_random_character(alphanumerics);

    return object;
}

function generate_real_numbers(length) {
    let object = "";
    let position_to_put_dot = Math.floor(Math.random() * (length - 2)) + 1;

    for (var i = 0; i < length; i++) {
        if (i == position_to_put_dot)
            object += '.';
        else
            object += get_random_character(integers);
    }
    return object;
}

function get_random_character(chars) {
    return chars.charAt(Math.floor(Math.random() * chars.length));
}

module.exports = { generate, reset_previously_generated_objects };