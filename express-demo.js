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
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-token')
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  next()
})

app.get('/nodeApi/getUserList', function(req, res) {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      return res.json({
        code: 0,
        msg: 'err'
      })
    } else {
      res.setHeader('Content-Type', 'text/html;chatset=utf8')
      res.cookie('n', '89890')
      res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
      res.json({
        code: 20000,
        status: 'success',
        data: JSON.parse(data.toString())
      })
    }
  })
})
app.post('/nodeApi/getUserDetail', function(req, res) {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      var userList = JSON.parse(data.toString())
      console.log('req.body', req.body)
      var userId = req.body.id
      var user = userList.find(i => i.id === userId)
      res.writeHead(200, {'Content-Type': 'text/plain;charset=utf8;'})
      res.end(JSON.stringify({
        code: 20000,
        status: 'success',
        data: user
      }))
    }
  })
})
app.get('/nodeApi/deleteUser', function(req, res) {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      return res.json({
        msg: 'err' 
      })
    } else {
      var userList = JSON.parse(data.toString())
      var userId = req.query.id
      var newUserList = userList.filter(i => i.id != userId)
      console.log(userId, newUserList)
      fs.writeFile('users.json', JSON.stringify(newUserList), function(err) {
        if(err) {
          console.log('写入文件失败')
        } else {
          res.json({
            code: 20000,
            success: true
          })
        }
      })
    }
  })
})
app.post('/nodeApi/updateUser', (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      return res.json({
        msg: 'err' 
      })
    } else {
      var userList = JSON.parse(data.toString())
      var newUser = req.body
      var newUserList = userList.map(i => {
        if (i.id === newUser.id) {
          return newUser
        } else {
          return i
        }
      })
      fs.writeFile('users.json', JSON.stringify(newUserList), function(err) {
        if(err) {
          return console.log('写入文件失败')
        } else {
          res.json({
            code: 20000,
            success: true
          })
        }
      })
    }
  })
})
app.post('/nodeApi/addUser', (req, res) => {
  fs.readFile('users.json', (err, data) => {
    if (err) {
      return res.json({
        msg: 'err' 
      })
    } else {
      var userList = JSON.parse(data.toString())
      var newUser = req.body
      var idx = userList.length - 1
      newUser.id = userList[idx].id + 1
      // console.log(userList[idx], userList[idx].id, newUser)
      userList.push(newUser)
      fs.writeFile('users.json', JSON.stringify(userList), function(err) {
        if(err) {
          return console.log('写入文件失败')
        } else {
          res.json({
            code: 20000,
            success: true
          })
        }
      })
    }
  })
})
var server = app.listen(3000, ()=> {
  var address = server.address().address
  var port = server.address().port
})