'use strict';
const alfy = require('alfy');
const fs = require('fs');
const os = require('os');

alfy.log([{
    title: __filename
}]);

var hostFilePath = os.homedir() + '/Library/Gas Mask/Local';
fs.readdir(hostFilePath, function(err, files) {
    if (err) {
        alfy.error(err.message);
        return;
    }
    var outputFiles = files.map(function(x, idx) {
        return {
            title: idx + ': ' + x
        };
    });
    // alfy.output(outputFiles);
});

// if (alfy.input > outputFiles.length) {
//     return;
// }

// alfy.output(outputFiles[alfy.input]);