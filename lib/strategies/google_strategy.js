/**
 * Define google strategy
 * @function googleStrategy
 * @param {string} clientId
 * @param {string} clientSecret
 * @param {string} callbackURL
 * @param {function} handler - Handler function
 */
'use strict'

const { Strategy: GoogleStrategy } = require('passport-google-oauth20')

/** @lends googleStrategy */
function googleStrategy (clientID, clientSecret, callbackURL, handler) {
  return new GoogleStrategy({
    clientID, clientSecret, callbackURL
  }, (token, tokenSecret, profile, callback) => {
    Promise.resolve(handler(token, tokenSecret, profile))
      .then((user) => callback(null, user))
      .catch((err) => callback(err))
  })
}

module.exports = googleStrategy
