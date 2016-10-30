/**
 * OAuth server for akoa
 * @module aoauth
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get aoauth () { return d(require('./aoauth')) },
  get strategies () { return d(require('./strategies')) }
}
