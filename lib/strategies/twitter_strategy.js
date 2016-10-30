/**
 * Define twitter strategy
 * @function twitterStrategy
 * @param {string} consumerKey
 * @param {string} consumerSecret
 * @param {string} callbackURL
 * @param {function} handler - Handler function
 */
'use strict'

const { Strategy: TwitterStrategy } = require('passport-twitter')

/** @lends twitterStrategy */
function twitterStrategy (consumerKey, consumerSecret, callbackURL, handler) {
  return new TwitterStrategy({
    consumerKey, consumerSecret, callbackURL
  }, (token, tokenSecret, profile, callback) => {
    Promise.resolve(handler(token, tokenSecret, profile))
      .then((user) => callback(null, user))
      .catch((err) => callback(err))
  })
}

module.exports = twitterStrategy
