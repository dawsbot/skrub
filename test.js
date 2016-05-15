const fs = require('fs');
const pathExists = require('path-exists');
const tempWrite = require('temp-write');
import test from 'ava';
import skrub from './';

test('valid args to main', t => {
  t.throws(skrub(), TypeError);
});

test('valid args to floodFile', t => {
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

  // skrub(file)
  //   .then(resp => {
  //     console.log('skrub resp: ', resp)
  //   })
});

test('removes file', async t => {
  const file = tempWrite.sync('');
  await skrub(file);

  t.false(pathExists.sync(file));
});
