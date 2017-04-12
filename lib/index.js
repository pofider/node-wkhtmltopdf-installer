var BinWrapper = require('bin-wrapper');
var path = require('path');
var logSymbols = require('log-symbols');

/**
 * Variables
 */

var BIN_VERSION = '0.12.3';
var BASE = process.env.WKHTMLTOPDF_CDNURL || 'https://github.com/pofider/node-wkhtmltopdf-installer/blob/master/downloads/';
var URL = BASE + BIN_VERSION + "/";

/**
 * Initialize a new BinWrapper
 */

var bin = (
  new BinWrapper({ strip: 0 })
  .src(URL + 'macosx.zip?raw=true', 'darwin')
  .src(URL + 'linux-x86_64.tar.gz?raw=true', 'linux', 'x64')
  .src(URL + 'windows.zip?raw=true', 'win32')
  .dest(path.join(__dirname, '../vendor'))
  .use(process.platform === 'win32' ? 'wkhtmltopdf.exe' : 'wkhtmltopdf')
);

var location;

/**
 * Module exports
 */

module.exports.v = BIN_VERSION;
module.exports.path = function() {
  var locationPath
  var binPath

  if (location) {
    binPath = location
  } else {
    locationPath = path.join(__dirname, "location.js")
    binPath = require(locationPath)

    if (path.basename(binPath) !== binPath) {
      // if path in location.js is relative resolve to absolute
      binPath = path.resolve(locationPath, binPath)
    }
  }

  return binPath;
};

module.exports.localPath = function() {
  return bin.path();
};

module.exports.download = function(cb) {
  bin.run(['--version'], function (err) {
    if (err) {
      console.log(logSymbols.error, err);
      console.log("Try running vendor/wkhtmltopdf to get more detailed error output.");
      return cb(err);
    }

    location = bin.path();
    console.log(logSymbols.success, ' Done! wkhtmltopdf binary available at ' + path.relative(path.join(__dirname, '../'), location));
    cb();
  });
};
