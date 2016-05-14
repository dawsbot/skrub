'use strict';
const globby = require('globby');
const fs = require('fs');
const fileBytes = require('file-bytes');
const del = require('del');
const crypto = require('crypto');
const shelljs = require('shelljs');
const pify = require('pify');
const pathExists = require('path-exists');
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

module.exports = pattern => {
  if (typeof pattern !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof pattern}`);
  }
  return globby(pattern)
    .then(files => Promise.all(files.map(file => {
      console.log(file);
      return floodFile(file)
        .then(rimrafP(file))
        .catch(err => {
          throw new Error('fuck');
        });
    })))
    // .catch(err => {
    //   throw new Error(err);
    // });
};
// module.exports = pattern => new Promise(resolve => {
//   // validate arguments
//   if (typeof pattern !== 'string') {
//     throw new TypeError(`Expected a string, got ${typeof pattern}`);
//   }

//   const files = globby.sync(pattern);
//   resolve(Promise.all(files.map(file => {
//     console.log(file);
//     return floodFile(file)
//       .then(pify(rimraf)(file));
//   })));
// });

module.exports.floodFile = floodFile;
