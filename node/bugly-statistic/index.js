var fs = require('fs');

if (process.argv.length < 4) {
    console.log('need more params');
    exit(1);
}

var filePath0 = process.argv[2];
var filePath1 = process.argv[3];

processFile(filePath0);
processFile(filePath1);

function processFile(filePath) {
    fs.readFile(filePath, function (err, data) {
        if (!err) {
            console.log('start process file: ', filePath);
            var obj = JSON.parse(data);
            processObject(obj);
            console.log('\n');
        }
        else {
            console.log('read file failed');
        }
    })
}

function processObject(obj) {
    var data = obj.ret.data;
    console.log('crashNum  crashUser accessUser');
    for (var index = 0; index < data.length; index++) {
        console.log(data[index].crashNum+'\t'+data[index].crashUser+'\t'+data[index].accessUser);
    }
}