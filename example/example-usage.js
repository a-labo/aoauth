'use strict'

const co = require('co')
const aoauth = require('aoauth')

co(function * () {
  let server = aoauth({
    twitter: aoauth.twitterStrategy(
      'your-consumer-key',
      'your-secret',
      'http://localhost:3000/oauth/twitter/callback'
    )
  }, {
    prefix: '/oauth'
  })
  server.listen(3010)
}).catch((err) => console.error(err))