'use strict';
const fs = require('fs');
const globby = require('globby');
const fileBytes = require('file-bytes');
const pify = require('pify');
const rimrafP = pify(require('rimraf'));

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

module.exports = pattern => new Promise(resolve => {
  // validate arguments
  if (typeof pattern !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof pattern}`);
  }

  const files = globby.sync(pattern);
  resolve(Promise.all(files.map(file => {
    // console.log(file);
    return floodFile(file)
      .then(rimrafP(file));
  })));
});

module.exports.floodFile = floodFile;
