var bin = require('./');
var logSymbols = require('log-symbols');
var path = require('path');
var exec = require('child_process').exec;
var fs = require("fs");

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

var binexe = process.platform === 'win32' ? 'wkhtmltopdf.exe' : 'wkhtmltopdf';

exec(binexe + " --version", function (error, stdout, stderr) {
    if (error) {
        console.log(logSymbols.warning, "Global command wkhtmltopdf doesn't seem to work. Downloading wkhtmltopdf localy to /vendor ...");
        bin.download(function(err) {
            if (!err)
                fs.writeFile(path.join(__dirname, "location.js"), "module.exports = '" + bin.localPath() + "'");
        });
        return;
    }

    fs.writeFile(path.join(__dirname, "location.js"), "module.exports = '" + binexe + "'");
    console.log(logSymbols.success, "Using global wkhtmltopdf");
});


