# esbuild-plugin-browserify-adapter

Use Browserify transforms as esbuild plugins

## Installation

The package is released to npm as `esbuild-plugin-browserify-adapter`:

```
npm install esbuild-plugin-browserify-adapter -D
```

## Usage

This adapter lets you use any existing [Browserify transform](https://github.com/browserify/browserify-handbook#transforms) as an esbuild plugin. The plugin function expects two arguments, the transform and an (optional) options object which will be passed through to the Browserify transform itself:

```js
const esbuild = require('esbuild')
const coffeeify = require('coffeeify') // any transform works
const browserifyAdapter = require('esbuild-plugin-browserify-adapter')

esbuild.build({
  entryPoints: ['./app.coffee'],
  bundle: true,
  plugins: [browserifyAdapter(coffeeify)],
  outDir: './public'
})
```

or when passing options:

```js
const esbuild = require('esbuild')
const envify = require('envify') // any transform works
const browserifyAdapter = require('esbuild-plugin-browserify-adapter')

esbuild.build({
  entryPoints: ['./app.js'],
  bundle: true,
  plugins: [browserifyAdapter(envify, { BUNDLE_TIME: new Date().toJSON() })],
  outDir: './public'
})
```
---

## Releasing a new version

New versions can be released using `npm version <patch|minor|major>`.

## License

Copyright 2021 Frederik Ring - Available under the Mozilla Public License 2.0
