/**
 * aoauth strategies
 * @module strategies
 */

'use strict'

let d = (module) => module && module.default || module

module.exports = {
  get facebookStrategy () { return d(require('./facebook_strategy')) },
  get googleStrategy () { return d(require('./google_strategy')) },
  get twitterStrategy () { return d(require('./twitter_strategy')) }
}
