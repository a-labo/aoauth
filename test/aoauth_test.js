/**
 * Test case for aoauth.
 * Runs with mocha.
 */
'use strict'

const aoauth = require('../lib/aoauth.js')
const asleep = require('asleep')
const assert = require('assert')
const aport = require('aport')
const co = require('co')

describe('aoauth', function () {
  this.timeout(3000)
  let port
  before(() => co(function * () {
    port = yield aport()
  }))

  after(() => co(function * () {

  }))

  it('Aoauth', () => co(function * () {
    let server = aoauth({
      twitter: aoauth.twitterStrategy(
        'your-consumer-key',
        'your-secret',
        'http://localhost:3000/oauth/twitter/callback'
      )
    }, {
      prefix: 'oauth'
    })
    assert.ok(server)
    yield server.listen(port)
    yield asleep(100)
    yield server.close()
  }))
})

/* global describe, before, after, it */
