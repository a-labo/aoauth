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
const genericSession = require('koa-generic-session')
const { KoaPassport } = require('koa-passport')
const colorprint = require('colorprint')

/** @lends aoauth */
function aoauth (strategies, options) {
  let {
    prefix = '/oauth',
    keys = [ 'aoauth-server' ],
    successRedirect = `${prefix}/success`,
    failureRedirect = `${prefix}/failure`,
    body = bodyParser(),
    session = convert(genericSession()),
    scopes = {},
    routes = {},
    middlewares = []
  } = options

  let app = akoa([])
  app.use(body)
  app.app.keys = keys
  app.use(session)

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

      for (let middleware of middlewares) {
        app.use(middleware)
      }

      app.use(
        route.get(authUrl, passport.authenticate(name, { scope: scopes[ name ] }))
      )
      app.use(
        route.get(callbackUrl, (ctx, next) =>
          passport.authenticate(name, {
            failureRedirect
          }, (user, info, status) => {
            let params = {}
            ctx.session.signed = user
            ctx.redirect(`${successRedirect}?${qs.stringify(params)}`)
          })(ctx, next)
        )
      )

      for (let url of Object.keys(routes)) {
        app.use(route.get(url, routes[ url ]))
      }

    })
  }

  return app
}

Object.assign(aoauth, require('./strategies'))

module.exports = aoauth
