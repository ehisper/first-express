// var http = require('http')
// var server = http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'text/html'})
//   res.end('hello')
// })
// server.listen(3000, () => {
//   var address = server.address()
//   console.log('server is running at', address.port)
// })


var events = require('events')
var eventEmitter = new events.EventEmitter()
var connectHandler = function(){
  console.log('连接成功')
  eventEmitter.emit('data_received')
}
var dataReceivedHandler  = function (data) {
  console.log('接收到数据了', data.toString())
}
// eventEmitter.on('connection', connectHandler)
eventEmitter.on('data_received', dataReceivedHandler)
eventEmitter.emit('connection')

// var fs = require('fs')
// fs.readFile('users.json', function(err, data) {
//   if(err) {
//     console.log(err)
//   } else {
//     eventEmitter.emit('data_received', data)
//   }
// })

var fs = require('fs')
var data = ''
var readerStream = fs.createReadStream('users.json')
readerStream.setEncoding('UTF8')
readerStream.on('data', function(chunk) {
  data += chunk
})
readerStream.on('end', function() {
  console.log(data)
})