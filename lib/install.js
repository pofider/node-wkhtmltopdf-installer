var bin = require('./');
var logSymbols = require('log-symbols');
var path = require('path');
var fs = require("fs");
var which = require('which');


var binexe = process.platform === 'win32' ? 'wkhtmltopdf.exe' : 'wkhtmltopdf';

function download() {
    console.log(logSymbols.warning, "Global command wkhtmltopdf doesn't seem to work. Downloading wkhtmltopdf localy to /vendor ...");
    bin.download(function(err) {
        if (!err)
            fs.writeFile(path.join(__dirname, "location.js"), "module.exports = '" + bin.localPath() + "'");
    });
}

which('wkhtmltopdf', function (er, resolvedPath) {
    if (er ) {
        return download();
    }

    fs.writeFile(path.join(__dirname, "location.js").replace("\\", "\\\\"), "module.exports = '" + binexe + "'");
    console.log(logSymbols.success, "Using global wkhtmltopdf");
});




