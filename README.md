# wkhtmltopdf-installer
[![NPM Version](http://img.shields.io/npm/v/wkhtmltopdf-installer.svg?style=flat-square)](https://npmjs.com/package/wkhtmltopdf-installer)
[![License](http://img.shields.io/npm/l/wkhtmltopdf-installer.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/pofider/node-wkhtmltopdf-installer.svg?branch=master)](https://travis-ci.org/pofider/node-wkhtmltopdf-installer)

> npm install wkhtmltopdf-installer

An NPM installer for [wkhtmltopdf](http://wkhtmltopdf.org/) utility. The package automatically downloads platform specific wkhtmltopdf binary if not already available as global command.


## Basics

This package is a port of [phantomjs npm installer](https://github.com/Medium/phantomjs) with the same API.

```javascript
var path = require('path');
var childProcess = require('child_process');
var binPath  = require('wkhtmltopdf-installer').path;

var childArgs = [
  path.join(__dirname, 'test.html'),
  path.join(__dirname, 'out.pdf'),
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  // handle results
})
```

## Troubleshooting
This package should support windows, linux and osx as well. For linux you may need to install some additional packages, see more [here](https://github.com/zakird/wkhtmltopdf_binary_gem/issues/19).

There is currently support just for x64.

[wkhtmltodf downloads](http://wkhtmltopdf.org/downloads.html) page provides different packages for every linux distribution and version. This project currently just grabs the binary from `Linux (Debian Wheezy)`. These binaries seems to work on Ubuntu as well.

## License
MIT
