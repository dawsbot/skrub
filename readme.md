<p align="center">
  <a><img src="img/logo.png" title="skrub logo"/></a>

  <a href="https://travis-ci.org/dawsonbotsford/skrub"><img src="https://api.travis-ci.org/dawsonbotsford/skrub.svg?branch=master"></a>
  <a href="https://ci.appveyor.com/project/dawsonbotsford/skrub"><img src="http://www.gravatar.com/avatar/5f66f56cae930eb9ab2cd9e62b8285e6"></a>
</p>

[![npm version](https://img.shields.io/npm/v/skrub.svg)](https://www.npmjs.com/package/skrub)
[![npm download count](http://img.shields.io/npm/dm/skrub.svg?style=flat)](http://npmjs.org/skrub)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

> Secure file deletion from any operating system

<br>

## Install

```
npm install --save skrub
```

<br>

## Usage



```js
const skrub = require('skrub');

skrub('hackathons');
//=> 'hackathons'
```
<br>

## API

### skrub(target)

<br>

#### target

Type: `string`

<br>

#### returns

Type: `string`

<br>

## License

MIT © [Dawson Botsford](http://dawsonbotsford.com)
