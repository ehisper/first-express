
var http = require('http')
var userList = ''
var options = {
  host: 'localhost',
  port: 3000,
  path: '/getUserList'
}
var callback = function(err, res) {
  if(err) {
    console.log('err', err)
  } else {
    res.on('data', function(chunk) {
      userList += chunk
    })
    res.on('end', function() {
      console.log('数据接受完成', userList)
    })
  }
}
var req = http.request(options, callback)
req.end()