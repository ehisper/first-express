var http = require('http')
var url = require('url')
var fs = require('fs')

var server = http.createServer((req, res) => {
  var pathname = url.parse(req.url).pathname
  // console.log('reqUrl', reqUrl)
  // res.writeHead(200, {'Content-Type': 'text/html'})
  // res.write(reqUrl.pathname)
  // res.end()
  fs.readFile(pathname.substr(1), 'utf8', (err, data) => {
    if(err) {
      res.writeHead(404, {'Content-Type':'text/html'})
    } else {
      res.writeHead(200, {'Content-Type':'text/html;chartset=utf8'})
      res.end(data.toString())
    }
  })
  // var body = ''
  // req.on('data', (chunk) => {
  //   body += chunk
  // })
  // req.on('end', () => {
  //   body = queryString.parse(body)
  //   res.writeHead(200, {'Content-Type':'text/html;charset=utf8', 'set-Cookie':'mycookie=44'})
  //   if (body.a && body.b) {
  //     res.write('')
  //   }
  // })



}).listen(3000)