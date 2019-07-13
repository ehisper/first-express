var express = require('express')
var util = require('util')
var fs = require('fs')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var app = express()
app.use(bodyParser.json()) // // parse application/json  
app.use(bodyParser.urlencoded({extended: false})) // // parse application/x-www-form-urlencoded, 返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(cookieParser())
app.use('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Credentials', true)
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  next()
})

app.get('/', function(req, res) {
  fs.readFile('index.html', (err, data) => {
    if (err) {
      return res.json({
        code: 0,
        msg: 'err'
      })
    } else {
      res.setHeader('Content-Type', 'text/html;chatset=utf8')
      res.render(data)
    }
  })
})
var server = app.listen(3003)