const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true })

// mongoose 連線後透過 mongoose.connection 拿到 Connection 的物件
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

const Record = require('./models/record')

// 設定第一個首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})