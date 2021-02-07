const through = require('through2')

module.exports = function (file, opts) {
  return through(function (chunk, enc, next) {
    next()
  }, function (done) {
    this.push('console.log("' + opts.replaceWith + '")')
    this.push(null)
  })
}
