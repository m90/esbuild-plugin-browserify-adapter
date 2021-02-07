/**
 * Copyright 2021 - Frederik Ring <frederik.ring@gmail.com>
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('fs')

module.exports = (transform, transformOptions) => ({
  name: 'browserify-adapter',
  setup (build) {
    build.onLoad({ filter: /.*/ }, (args) => {
      return new Promise(function (resolve, reject) {
        fs.createReadStream(args.path)
          .pipe(transform(args.path, transformOptions))
          .on('error', function (err) {
            resolve({ errors: [{ text: 'Error applying transform', detail: err }] })
          })
          .on('data', function (data) {
            resolve({ contents: data })
          })
      })
    })
  }
})
