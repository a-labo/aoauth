/**
 * OAuth server for akoa
 * @module aoauth
 * @version 1.1.0
 */

'use strict'

const aoauth = require('./aoauth')

let lib = aoauth.bind(this)

Object.assign(lib, aoauth, {
  aoauth
})

module.exports = lib
