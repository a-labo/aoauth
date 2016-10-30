/**
 * Define facebook strategy
 * @function facebookStrategy
 * @param {string} clientID
 * @param {string} clientSecret
 * @param {string} callbackURL
 * @param {function} handler - Handler function
 */
'use strict'

const { Strategy: FacebookStrategy } = require('passport-facebook')

/** @lends facebookStrategy */
function facebookStrategy (clientID, clientSecret, callbackURL, handler) {
  return new FacebookStrategy({
    clientID, clientSecret, callbackURL
  }, (token, tokenSecret, profile, callback) => {
    Promise.resolve(handler(token, tokenSecret, profile))
      .then((user) => callback(null, user))
      .catch((err) => callback(err))
  })
}

module.exports = facebookStrategy
