const path = require('path')
const tape = require('tape')
const vm = require('vm')
const envify = require('envify')
const esbuild = require('esbuild')
const yamlify = require('yamlify')
const coffeeify = require('coffeeify')

const dummy = require('./dummy')
const browserifyAdapter = require('..')

tape.test('applies the given transform and options (custom dummy transform)', function (t) {
  bundle('local.js', browserifyAdapter([dummy, { replaceWith: 'Puppies!' }]), function (err, src) {
    if (err) {
      t.fail(err)
    }
    vm.runInNewContext(src, {
      console: { log: log }
    })

    function log (value) {
      t.equal(value, 'Puppies!', 'passes')
      t.end()
    }
  })
})

tape.test('applies the given transform and options (envify)', function (t) {
  bundle('envify.js', browserifyAdapter([envify, { ENVIFY_VALUE: 'Browserify' }]), function (err, src) {
    if (err) {
      t.fail(err)
    }
    vm.runInNewContext(src, {
      console: { log: log }
    })

    function log (value) {
      t.equal(value, 'Hello Browserify!', 'passes')
      t.end()
    }
  })
})

tape.test('applies the given transform and options (yamlify)', function (t) {
  bundle('yaml.js', browserifyAdapter(yamlify), function (err, src) {
    if (err) {
      t.fail(err)
    }
    vm.runInNewContext(src, {
      console: { log: log }
    })

    function log (value) {
      t.equal(value, 'ok!', 'passes')
      t.end()
    }
  })
})

tape.test('applies multiple transforms in order (yamlify + envify)', function (t) {
  bundle('multi.js', browserifyAdapter(yamlify, [envify, { ENVIFY_VALUE: 'puppies' }]), function (err, src) {
    if (err) {
      t.fail(err)
    }
    vm.runInNewContext(src, {
      console: { log: log }
    })

    function log (value) {
      t.equal(value, '12 puppies', 'passes')
      t.end()
    }
  })
})

tape.test('applies to entrypoints as well (coffeeify)', function (t) {
  bundle('app.coffee', browserifyAdapter(coffeeify), function (err, src) {
    if (err) {
      t.fail(err)
    }
    vm.runInNewContext(src, {
      console: { log: log }
    })

    function log (value) {
      t.equal(value, 'smarter than ur average bear', 'passes')
      t.end()
    }
  })
})

function bundle (file, configuredPlugin, callback) {
  esbuild.build({
    entryPoints: [path.join(__dirname, file)],
    bundle: true,
    plugins: [configuredPlugin],
    write: false
  })
    .then(function (result) {
      callback(null, result.outputFiles[0].text)
    }, function (errResult) {
      callback(errResult.errors)
    })
}
