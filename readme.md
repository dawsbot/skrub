<p align="center">
  <a><img src="img/logo.png" title="skrub logo"/></a>

  <br>

  <b>Irreversible file deletion from any operating system</b>

  <br>
  <br><br><a href="https://travis-ci.org/dawsonbotsford/skrub"><img src="https://api.travis-ci.org/dawsonbotsford/skrub.svg?branch=master"></a>
  <a href="https://ci.appveyor.com/project/dawsonbotsford/skrub"><img src="https://ci.appveyor.com/api/projects/status/3x9sboy9jsil33mb?svg=true"></a>

  <br>

  <a href="https://www.npmjs.com/package/skrub"><img src="https://img.shields.io/npm/v/skrub.svg"></a>
  <a href="http://npmjs.org/skrub"><img src="http://img.shields.io/npm/dm/skrub.svg?style=flat"></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg"></a>
</p>


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
