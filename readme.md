<p align="center">
  <a><img src="img/logo.png" title="skrub logo"/></a>

  <a href="https://travis-ci.org/dawsonbotsford/skrub"><img src="https://api.travis-ci.org/dawsonbotsford/skrub.svg?branch=master"></a>
  <a href="https://ci.appveyor.com/project/dawsonbotsford/skrub"><img src="http://www.gravatar.com/avatar/5f66f56cae930eb9ab2cd9e62b8285e6"></a>
</p>

[![npm version](https://img.shields.io/npm/v/skrub.svg)](https://www.npmjs.com/package/skrub)
[![npm download count](http://img.shields.io/npm/dm/skrub.svg?style=flat)](http://npmjs.org/skrub)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Irreversible file deletion from any operating system

<br>

Works on OS X, Linux, and Windows.

In contrast to `rm`, which [leaves file contents unallocated in memory](http://unix.stackexchange.com/questions/10883/where-do-files-go-when-the-rm-command-is-issued), `scrub` first floods the file with garbage data and then **removes it forever**.

Looking for the [command-line version](https://github.com/dawsonbotsford/skrub-cli)?
<br>

## Install

```
npm install --save skrub
```

<br>

## Usage

```js
const skrub = require('skrub');

skrub(['passwords.*', '!dontDelete.js']).then(paths => {
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

See the `node-glob` [options](https://github.com/isaacs/node-glob#options).

##### dryRun

Type: `boolean`
Default: `false`

See what would be skrubbed without actually deleting anything.

```js
const skrub = require('skrub');

skrub(['tmp/*.js'], {dryRun: true}).then(paths => {
  console.log('Files and folders that would be skrubbed:\n', paths.join('\n'));
});
```

<br>

## Related

* [skrub-cli](https://github.com/dawsonbotsford/skrub-cli)
* [del](https://github.com/sindresorhus/del)
* [trash](https://github.com/sindresorhus/trash)

<br>

## License

MIT © [Dawson Botsford](http://dawsonbotsford.com)
