const tk = require('inject-typekit-script-stream')
const sheetify = require('sheetify/stream')
const vdom = require('virtual-dom-stream')
const browserify = require('browserify')
const match = require('pathname-match')
const wayfarer = require('wayfarer')
const hs = require('hyperstream')
const bankai = require('bankai')
const stream = require('stream')

const router = wayfarer('/404')
const client = require('client-main')

module.exports = api

// return the api function
// (req, res, obj) -> rstream
function api (req, res, ctx) {
  return router(match(req.url), req, res, ctx)
}

// html
const html = bankai.html()
router.on('/', function (params, req, res) {
  return html(req, res)
})

// js
const js = bankai.js(browserify, 'client-main')
router.on('/bundle.js', (params, req, res) => js(req, res))

// css
const css = bankai.css(sheetify, 'client-main/index.css', {
  use: [ 'sheetify-cssnext' ]
})
router.on('/bundle.css', (params, req, res) => css(req, res))

// 404
router.on('/404', function (params, req, res) {
  res.statusCode = 404
  const pts = new stream.PassThrough()
  pts.end()
  return pts
})
