var bin = require('./');
var logSymbols = require('log-symbols');
var path = require('path');
var exec = require('child_process').exec;

/**
 * Install binary and check whether it works
 * If the test fails, try to build it
 */

exec((process.platform === 'win32' ? 'wkhtmltopdf.exe' : 'wkhtmltopdf') + " --version", function (error, stdout, stderr) {
    if (error) {
        console.log(logSymbols.warning, "Global command wkhtmltopdf doesn't seem to work. Downloading wkhtmltopdf localy to /vendor ...");
        bin.run();
        return;
    }

    console.log(logSymbols.success, "Using global wkhtmltopdf");
});


