const boleStream = require('bole-stream')
const httpNdjson = require('http-ndjson')
const sizeStream = require('size-stream')
const summary = require('server-summary')
const stdout = require('stdout-stream')
const pumpify = require('pumpify')
const bole = require('bole')
const http = require('http')

const api = require('./api')

module.exports = createServer

function createServer (argv) {
  bole.output({ level: argv.logLevel, stream: stdout })
  const logStream = boleStream({ level: 'debug' })
  logStream.setMaxListeners(0)
  const port = argv.port

  // create server
  const server = http.createServer(function (req, res) {
    const httpLogger = httpNdjson(req, res)
    httpLogger.pipe(logStream, { end: false })

    const size = sizeStream()
    size.once('size', function (size) {
      httpLogger.setContentLength(size)
    })

    const sink = pumpify(size, res)
    api(req, res).pipe(sink)
  })

  // start the server on port
  server.listen(port, summary(server))
}
