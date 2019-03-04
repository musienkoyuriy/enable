# enabler
 ✋ *Accessibility analyzer for your frontend.*

[<img src="https://badge.fury.io/js/enabler.svg" alt="npm version" >](https://badge.fury.io/js/enabler)
[<img src="https://img.shields.io/npm/dm/enabler.svg" alt="npm downloads" >]("https://npmjs.org/enabler)
[![Dependency Status](https://david-dm.org/palantir/tslint.svg)](https://david-dm.org/musienkoyuriy/enabler)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg)](https://opensource.org/licenses/mit-license.php)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> It's just a node.js util which analyzes your templates all over the project and warns you about potential accessibility problems.

`Enabler`’s aim is to give developer ability to increase accessibility in development stage, but not after publishing site/application to production.

Frameworks support: Angular, Vue.

## Up & Running:

```
> npm i --save-dev enabler
```

*or*

```
> yarn add enabler --dev
```

package.json

```
...
scripts: {
  "a11y": 'enabler --path ./templates-root-folder'
}
...
```

```
> npm run a11y
```

*or*

```
> yarn run a11y

```

## Options:
```
    -v, --version   output the version number
    -p, --path <s>  Path for your root components folder
    --ng            Detect angular abstractions
    --vue           Support .vue files
    -h, --help      output usage information
 ```

 ## Built with:

- [cheerio](https://github.com/cheeriojs/cheerio) - Fast, flexible, and lean implementation of core jQuery designed specifically for the server.

- [chalk](https://github.com/chalk/chalk) - Terminal string styling done right

## LICENSE

**The software is license under "MIT"**

> Copyright (c) 2018 Musienko Yuriy
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.

