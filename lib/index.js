var BinWrapper = require('bin-wrapper');
var path = require('path');
var pkg = require('../package.json');

/**
 * Variables
 */

var BIN_VERSION = '0.12.2';
var BASE = process.env.PHANTOMJS_CDNURL || 'https://github.com/pofider/node-wkhtmltopdf-installer/downloads/';
var URL = BASE + BIN_VERSION + "/";

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper({ strip: 1 })
    .src(URL + 'macosx.zip', 'darwin')
    .src(URL + 'macosx.zip', 'openbsd')
    .src(URL + 'macosx.zip', 'freebsd')
    .src(URL + 'linux-i686.tar.bz2', 'linux', 'x86')
    .src(URL + 'linux-x86_64.tar.bz2', 'linux', 'x64')
    .src(URL + 'windows.zip', 'win32')
    .dest(path.join(__dirname, '../vendor'))
    .use(process.platform === 'win32' ? 'wkhtmltopdf.exe' : 'bin/wkhtmltopdf');

/**
 * Module exports
 */

module.exports = bin;
module.exports.v = BIN_VERSION;