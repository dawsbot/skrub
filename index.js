'use strict';
const fs = require('fs');
const globby = require('globby');
const fileBytes = require('file-bytes');
const objectAssign = require('object-assign');
const path = require('path');
const pify = require('pify');
const rimrafP = pify(require('rimraf'));
const toType = require('to-type');

const floodFile = file => {
  return fileBytes(file)
    .then((size) => {
      return new Promise(resolve => {
        let wstream = fs.createWriteStream(file);
        wstream.write(Buffer.alloc(size));
        wstream.end();
        wstream.on('finish', () => {
          resolve();
        });
      });
    }).catch(err => {
      throw err;
    });
};

module.exports = (pattern, opts) => new Promise(resolve => {
  // validate arguments
  const patternType = toType(pattern);
  if (patternType !== 'string' && patternType !== 'array') {
    throw new TypeError(`Expected a string or array for pattern, got ${typeof pattern}`);
  }
  opts = objectAssign({}, opts);

  const files = globby.sync(pattern, opts);
  resolve(Promise.all(files.map(file => {
    file = path.resolve(opts.cwd || '', file);
    return floodFile(file)
      .then(() => {
        return rimrafP(file).then(() => {
          return file;
        });
      });
  })));
});

module.exports.floodFile = floodFile;
