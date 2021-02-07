# esbuild-plugin-browserify-adapter

Use Browserify transforms as esbuild plugins

## Installation

The package is released to npm as `esbuild-plugin-browserify-adapter`:

```
npm install esbuild-plugin-browserify-adapter -D
```

## Usage

This adapter lets you use any existing [Browserify transform](https://github.com/browserify/browserify-handbook#transforms) as an esbuild plugin. The plugin function can be passed an arbitrary number of transforms. Just like with Browserify itself, options are passed by wrapping the transform in an array and appending the options to that list.

__Please note: This module does not work with Browserify plugins.__

### Basic usage

```js
const esbuild = require('esbuild')
const coffeeify = require('coffeeify') // any transform works
const browserifyAdapter = require('esbuild-plugin-browserify-adapter')

esbuild.build({
  entryPoints: ['./app.coffee'],
  bundle: true,
  plugins: [browserifyAdapter(coffeeify)],
  outdir: './public'
})
```

### Passing options

```js
const esbuild = require('esbuild')
const envify = require('envify') // any transform works
const browserifyAdapter = require('esbuild-plugin-browserify-adapter')

esbuild.build({
  entryPoints: ['./app.js'],
  bundle: true,
  plugins: [browserifyAdapter([envify, { BUNDLE_TIME: new Date().toJSON() }])],
  outdir: './public'
})
```

### Passing multiple transforms

In case you need to use multiple transforms, pass all of them to the adapter at once. Just like in Browserify, they will be run in the order given.

```js
const esbuild = require('esbuild')
const coffeeify = require('coffeeify') // any transform works
const envify = require('envify') // any transform works
const browserifyAdapter = require('esbuild-plugin-browserify-adapter')

esbuild.build({
  entryPoints: ['./app.coffee'],
  bundle: true,
  plugins: [browserifyAdapter(
    coffeeify,
    [envify, { BUNDLE_TIME: new Date().toJSON() }]
  )],
  outdir: './public'
})
```

---

## Releasing a new version

New versions can be released using `npm version <patch|minor|major>`.

## License

Copyright 2021 Frederik Ring - Available under the Mozilla Public License 2.0
