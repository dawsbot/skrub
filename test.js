const fs = require('fs-extra');
const path = require('path');
const pathExists = require('path-exists');
const tempWrite = require('temp-write');
const tempfile = require('tempfile');

import test from 'ava';
import skrub from './';

function exists(t, files) {
  [].concat(files).forEach(file => t.true(pathExists.sync(path.join(t.context.tmp, file))));
}

function notExists(t, files) {
  [].concat(files).forEach(file => t.false(pathExists.sync(path.join(t.context.tmp, file))));
}

const fixtures = [
  '1.tmp',
  '2.tmp',
  '3.tmp',
  '4.tmp',
  '.dot.tmp'
];

test.beforeEach(t => {
  t.context.tmp = tempfile();
  fixtures.forEach(fixture => fs.ensureFileSync(path.join(t.context.tmp, fixture)));
});

test('invalid args to main', t => {
  t.throws(skrub(), TypeError);
});

test('invalid args to floodFile', t => {
  t.throws(skrub.floodFile('doesNotExist.txt'), Error);
  t.throws(skrub.floodFile(false), Error);
});

test('floods file', async t => {
  const initialContents = '12345';
  const file = tempWrite.sync(initialContents);

  await skrub.floodFile(file);
  const finalContents = fs.readFileSync(file);

  t.true(pathExists.sync(file));
  t.not(initialContents, finalContents);
  t.is(initialContents.length, finalContents.length);
  t.deepEqual(finalContents, Buffer.alloc(5));
});

test('removes files', async t => {
  await skrub(['*.tmp', '!1*'], {cwd: t.context.tmp});

  exists(t, ['1.tmp', '.dot.tmp']);
  notExists(t, ['2.tmp', '3.tmp', '4.tmp']);
});
