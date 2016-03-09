const httpNdjson = require('http-ndjson')
const sizeStream = require('size-stream')
const summary = require('server-summary')
const pumpify = require('pumpify')
const bole = require('bole')
const http = require('http')

const api = require('./api')

module.exports = createServer

function createServer (argv) {
  const log = bole('server')
  bole.output({ level: argv.logLevel, stream: process.stdout })
  const port = argv.port

  // create server
  const server = http.createServer(function (req, res) {
    const setSize = httpNdjson(req, res, log.debug)
    const size = sizeStream()
    size.once('size', setSize)
    const sink = pumpify(size, res)
    api(req, res).pipe(sink)
  })

  // start the server on port
  server.listen(port, summary(server))
}
