var bin = require('./');
var logSymbols = require('log-symbols');
var path = require('path');
var fs = require('fs');
var which = require('which');

var binexe = process.platform === 'win32' ? 'wkhtmltopdf.exe' : 'wkhtmltopdf';

function download() {
  bin.download(function(err) {
    var locationPath
    var localPath

    if (!err) {
      locationPath = path.join(__dirname, "location.js")
      localPath = bin.localPath()
      // converting to relative format to keep working when files are moved to another base location
      // see https://github.com/pofider/node-wkhtmltopdf-installer/issues/6
      localPath = path.relative(locationPath, localPath)

      fs.writeFileSync(locationPath, "module.exports = '" + localPath.replace(/\\/g, "\\\\") + "'");
    }
  });
}

which('wkhtmltopdf', function (er, resolvedPath) {
  if (er) {
    console.log(logSymbols.warning, "Global command wkhtmltopdf doesn't seem to work. Downloading wkhtmltopdf localy to /vendor ...");
    return download();
  }

  fs.writeFileSync(path.join(__dirname, "location.js"), "module.exports = '" + binexe.replace(/\\/g, "\\\\") + "'");
  console.log(logSymbols.success, "Using global wkhtmltopdf");
});
