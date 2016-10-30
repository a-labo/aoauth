/**
 * Define a http server for auth
 * @function aoauth
 * @param {Object} options - Optional settings
 * @param {string} options.keys - Session secret keys
 */
'use strict'

const qs = require('qs')
const akoa = require('akoa')
const route = require('koa-route')
const { spinalcase } = require('stringcase')

const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const session = require('koa-generic-session')
const { KoaPassport } = require('koa-passport')
const colorprint = require('colorprint')

/** @lends aoauth */
function aoauth (strategies, options) {
  let {
    prefix = '/oauth',
    keys,
    successRedirect = `${prefix}/success`,
    failureRedirect = `${prefix}/ failure`,
  } = options

  let app = akoa([])
  app.use(bodyParser())
  app.keys = keys
  app.use(convert(session()))

  {
    let passport = new KoaPassport()
    app.use(passport.initialize())
    app.use(passport.session())

    Object.keys(strategies).forEach((name) => {
      passport.use(name, strategies[ name ])

      let authUrl = `${prefix}/${spinalcase(name)}`
      let callbackUrl = `${prefix}/${spinalcase(name)}/callback`
      colorprint.trace(`[aoauth] Register url: ${authUrl}`)
      colorprint.trace(`[aoauth] Register url: ${callbackUrl}`)

      app.use(route.get(authUrl), passport.authenticate(name))
      app.use(route.get(callbackUrl), (ctx, next) =>
        passport.authenticate(name, {
          failureRedirect
        }, (user, info, status) => {
          let params = {}
          ctx.redirect(`${successRedirect}?${qs.stringify(params)}`)
        })(ctx, next)
      )
    })
  }

  return app
}

Object.assign(aoauth, require('./strategies'))

module.exports = aoauth
