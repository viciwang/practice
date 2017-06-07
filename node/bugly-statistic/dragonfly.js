var fs = require('fs');
var path = require('path');

processFile(path.join(__dirname, "dragonfly-data.json"));

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
    // console.log(obj);
    var data = obj["responses"][0]["aggregations"]["1"]["buckets"];
    console.log('crashNum  crashUser accessUser');
    var sum = 0;
    var array = [];
    for (var index = 0; index < data.length; index++) {
        // console.log(data[index].crashNum+'\t'+data[index].crashUser+'\t'+data[index].accessUser);
        // console.log(data[index].doc_count);
        array.push(data[index].doc_count);
        sum += data[index].doc_count;
    }
    var sort = array.sort((first, second) => {
        if (first <= second) {
            return 1;
        }
        else {
            return -1;
        }
    });
    console.log(sort);
    console.log("result" + sum/data.length);
}