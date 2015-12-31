const http = require('http')

http.createServer(function (req, res) {
  res.end('hello world')
}).listen(1337)
