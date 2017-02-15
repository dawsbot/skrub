<p align="center">
  <a><img src="img/logo.png" title="skrub logo"/></a>

  <br>

  <b>Irreversible file deletion on every operating system</b>
  <br>
  <i>* Will only work securely on file systems that overwrite blocks in place *</i>

  <br>
  <br><br><a href="https://travis-ci.org/dawsbot/skrub"><img src="https://api.travis-ci.org/dawsbot/skrub.svg?branch=master"></a>
  <a href="https://ci.appveyor.com/project/dawsbot/skrub"><img src="https://ci.appveyor.com/api/projects/status/3x9sboy9jsil33mb?svg=true"></a>

  <br>

  <a href="https://www.npmjs.com/package/skrub"><img src="https://img.shields.io/npm/v/skrub.svg"></a>
  <a href="http://npmjs.org/skrub"><img src="http://img.shields.io/npm/dm/skrub.svg?style=flat"></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg"></a>
</p>

<br>

In contrast to `rm`, which [leaves file contents unallocated in memory](http://unix.stackexchange.com/questions/10883/where-do-files-go-when-the-rm-command-is-issued), `skrub` first floods file(s) with garbage data and then **removes them forever**.

The current method is low fidelity and "will prevent the data from being retrieved simply by reading using standard system functions". Read more in the [FAQ](#faq) below or on Wikipedia [here](https://en.wikipedia.org/wiki/Data_remanence#Overwriting).

Works on OS X, Linux, **and** Windows.

Looking for the [command-line version](https://github.com/dawsbot/skrub-cli)?

<br>

## Install

```
npm install --save skrub
```

<br>

Or try the [command-line version](https://github.com/dawsbot/skrub-cli)
```
npm install --global skrub
```
<br>

## Usage

```js
const skrub = require('skrub');

skrub(['*', '!important*']).then(paths => {
    console.log('Skrubbed files and folders:\n', paths.join('\n'));
});
```

*You can use [glob patterns](https://github.com/sindresorhus/globby#globbing-patterns).*

<br>

## API

### skrub(patterns, [options])

Returns a promise for an array of skrubbed paths.

#### patterns

Type: `string`, `array`

See supported minimatch [patterns](https://github.com/isaacs/minimatch#usage).

- [Pattern examples with expected matches](https://github.com/sindresorhus/multimatch/blob/master/test.js)
- [Quick globbing pattern overview](https://github.com/sindresorhus/multimatch#globbing-patterns)

#### options

Type: `object`

##### dryRun

Type: `boolean`<br />
Default: `false`

See what would be skrubbed without actually deleting anything.

```js
skrub(['tmp/*.js'], {dryRun: true}).then(paths => {
  console.log('Files and folders that would be skrubbed:\n', paths.join('\n'));
});
```

In additon to these two options, all `node-glob` [options](https://github.com/isaacs/node-glob#options) are also available.

##### iterations

Type: `number`(must be >= 0)<br />
Default: 1

Zero-fill the specified file multiple times.

```js
skrub(['tmp/*.js'], {iterations: 7}).then(paths => {
  console.log('Files and folders that would be skrubbed:\n', paths.join('\n'));
});
```

<br>

### skrub.floodFile(filePath, iterations)

Returns a promise for the flooded filePath. Replaces the contents of file at `filePath` with the same amount of bytes zero-filled.

#### filePath

Type: `string`

#### iterations

Type: `number`(must be >= 0)<br />
Default: 1

Zero-fill the specified file multiple times.

<br>

## FAQ

### Unreliable file systems
`skrub` and other overwriting-based methods *may not be effective* on your file system, since the disk may not actually write where you think it's writing. Here is a list of systems which are known not to cooperate with the current file overwriting method. [Why don't these work?](http://cseweb.ucsd.edu/~m3wei/assets/pdf/FMS-2010-Secure-Erase.pdf)
* [copy-on-write systems](https://en.wikipedia.org/wiki/Copy-on-write) like btrfs
* ssd's at large
* reiserfs
* COW

In the above scenarios, `skrub` is just a friendly wrapper around `rm`.

### How secure is this?
At a minimum, this will prevent the data from being retrieved simply by reading from the media again using standard system functions.

### But I can do the same thing with `rm`

Not really. The `rm` command simply frees the file-pointer in your operating system. This allows the file contents to be written over **at a later date**. This means that during the time before that memory location is needed (which it may never), your data is still at rest on your system.

`rm` ships with a `-P` flag which first does file overwrites with blank data. Although the end result is similar, this does not support negation in globbing and is not cross-platform.

### But I can do the same thing with `shred`

Not the case. The `shred` command is a Linux only distribution while `skrub` is cross-platform. `skrub` also supports negation within file globbing. `shred` does not have a friendly node.js module wrapper around it either.

<br>

## Benchmarking

TL;DR: Running more iterations than one is hardly slower.
```
skrub(tempFile, {iterations: 1}) x 57,512 ops/sec ±2.60% (69 runs sampled)
skrub(tempFile, {iterations: 7}) x 54,338 ops/sec ±2.59% (82 runs sampled)
skrub(tempFile, {iterations: 36}) x 54,631 ops/sec ±2.95% (79 runs sampled)
Fastest is skrub(tempFile, {iterations: 1})
```

Try it yourself:

```shell
npm run benchmark
```

<br>

## Related

* [skrub-cli](https://github.com/dawsbot/skrub-cli)
* [file-wipe](https://github.com/simonlovesyou/file-wipe)
* [del](https://github.com/sindresorhus/del)
* [trash](https://github.com/sindresorhus/trash)

<br>

## License

MIT © [Dawson Botsford](http://dawsonbotsord.com)
