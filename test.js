const path = require('path');
const fs = require('fs-extra');
const pathExists = require('path-exists');
const tempWrite = require('temp-write');
const tempfile = require('tempfile');

import test from 'ava';
import skrub from './';

function prependPath(t, files) {
  return files.map(file => {
    return path.join(t.context.tmp, file);
  });
}

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

test('skrub - invalid args', t => {
  t.throws(skrub(), TypeError);
});

test('skrub.flood - invalid args', t => {
  t.throws(skrub.floodFile('doesNotExist.txt'), Error);
  t.throws(skrub.floodFile(false), Error);
});

test('skrub.flood - floods file', async t => {
  const initialContents = '12345';
  const file = tempWrite.sync(initialContents);

  await skrub.floodFile(file)
    .then(resp => {
      t.is(resp, file);
    });
  const finalContents = fs.readFileSync(file);

  t.true(pathExists.sync(file));
  t.not(initialContents, finalContents);
  t.is(initialContents.length, finalContents.length);
  t.deepEqual(finalContents, Buffer.alloc(5));
});

test('skrub - dryrun does not remove files', async t => {
  await skrub(['*.tmp', '!1*'], {
    cwd: t.context.tmp,
    dryRun: true
  }).then(files => {
    t.deepEqual(files, prependPath(t, ['2.tmp', '3.tmp', '4.tmp']));
  });

  exists(t, ['1.tmp', '2.tmp', '3.tmp', '4.tmp', '.dot.tmp']);
});

test('skrub - removes files', async t => {
  await skrub(['*.tmp', '!1*'], {cwd: t.context.tmp});

  exists(t, ['1.tmp', '.dot.tmp']);
  notExists(t, ['2.tmp', '3.tmp', '4.tmp']);
});
