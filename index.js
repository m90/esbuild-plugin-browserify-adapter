/**
 * Copyright 2021 - Frederik Ring <frederik.ring@gmail.com>
 * SPDX-License-Identifier: MPL-2.0
 */

const fs = require('fs')
const crypto = require('crypto')

module.exports = (transform, transformOptions) => {
  // the name of the esbuild plugin needs to be unique per transform, so
  // a hash of the function body is appended
  const transformId = crypto.createHash('sha256').update(transform.toString())
  return {
    name: `browserify-adapter-${transformId.digest('hex')}`,
    setup (build) {
      build.onLoad({ filter: /.*/ }, (args) => {
        return new Promise(function (resolve, reject) {
          fs.createReadStream(args.path)
            .pipe(transform(args.path, transformOptions || {}))
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
