/**
 * Nodeunit functional tests.  Requires internet connection to validate wkhtmltopdf
 * functions correctly.
 */

var childProcess = require('child_process');
var fs = require('fs');
var path = require('path');
var htmltopdf = require('../');
var bin = require('../lib');

exports.setUp = function(callback) {
  bin.download(callback);
};

exports.testDownload = function (test) {
  test.expect(1);
  test.ok(fs.existsSync(htmltopdf.path), 'Binary file should have been downloaded');
  test.done();
};


exports.testHtmlToPdfTransformation = function (test) {
  test.expect(2);

  var childArgs = [
    path.join(__dirname, "test.html"),
    path.join(__dirname, "test.pdf"),
  ];

  childProcess.execFile(htmltopdf.path, childArgs, function (err, stederr, stdout) {
    var value = (stdout.indexOf('Done') !== -1);
    test.ok(value, 'Test script should have executed and returned string Done');
    test.ok(fs.existsSync(path.join(__dirname, "test.pdf")), 'Test should have created a test.pdf');
    test.done();
  });
};


exports.testBinFile = function (test) {
  test.expect(1);

  var binPath = htmltopdf.path;

  childProcess.execFile(binPath, ['--version'], function (err, stdout, stderr) {
    test.ok(stdout.trim().indexOf(htmltopdf.version) > -1, 'Version should be match');
    test.done();
  });
};