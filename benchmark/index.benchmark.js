'use strict';
const Benchmark = require('benchmark');
let suite = new Benchmark.Suite;
require('babel-polyfill');

const skrub = require('../index.js');
const tempfile = require('tempfile');
const fs = require('fs');

function _writeTempFile(data) {
	const fileName = tempFile.sync();
	fs.writeFileSync(data, fileName);
	return fileName;
}

const myData = 'the quick brown fox jumped over the lazy dog';

// add tests
suite.add('skrub(tempFile, {iterations: 1})', async function() {
	await skrub(_writeTempFile(myData, {iterations: 1}));
})
.add('skrub(tempFile, {iterations: 7})', async function() {
	await skrub(_writeTempFile(myData, {iterations: 7}));
})
.add('skrub(tempFile, {iterations: 36})', async function() {
	await skrub(_writeTempFile(myData, {iterations: 36}));
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': true });
