/**
 * Copyright 2021 - Frederik Ring <frederik.ring@gmail.com>
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('fs')

module.exports = (...transforms) => {
  return {
    name: 'browserify-adapter',
    setup (build) {
      const normalizedTransforms = transforms.map(t => Array.isArray(t) ? t : [t])
      build.onLoad({ filter: /.*/ }, (args) => {
        return new Promise(function (resolve, reject) {
          let file = fs.createReadStream(args.path)
          for (const [transformFn, options] of normalizedTransforms) {
            file = file.pipe(transformFn(args.path, options || {}))
          }

          file
            .on('error', function (err) {
              resolve({
                errors: [{ text: 'Error applying transform', detail: err }]
              })
            })
            .on('data', function (data) {
              resolve({ contents: data })
            })
        })
      })
    }
  }
}
