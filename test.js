import test from 'ava';
import skrub from './';
const fs = require('fs');
const pathExists = require('path-exists');
const fileBytes = require('file-bytes');
const tempWrite = require('temp-write');

test.only('valid args to main', t => {
  t.throws(skrub(), TypeError);
});

test('valid args to floodFile', t => {
  t.throws(skrub.floodFile('doesNotExist.txt'), Error);
});

test('floods file', async t => {
  const initialContents = '12345';
  const file = tempWrite.sync(initialContents);

  await skrub.floodFile(file);

  t.true(pathExists.sync(file));

  const finalContents = fs.readFileSync(file);
  t.not(initialContents, finalContents);
  t.is(initialContents.length, finalContents.length);
  t.deepEqual(finalContents, Buffer.alloc(5));
});

test('removes file', async t => {
  const file = tempWrite.sync();
  await skrub(file)

  t.false(pathExists.sync(file));
});
