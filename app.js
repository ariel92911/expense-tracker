const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/record', { useUnifiedTopology: true, useNewUrlParser: true })

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
  res.send('這是記帳首頁')
})
// 列出全部 record
app.get('/records', (req, res) => {
  res.send('列出所有 record')
})
// 新增一筆 record 頁面
app.get('/records/new', (req, res) => {
  res.send('新增 record 頁面')
})
// 新增一筆  record
app.post('/records', (req, res) => {
  res.send('建立 record')
})
// 修改 record 頁面
app.get('/records/:id/edit', (req, res) => {
  res.send('修改 record 頁面')
})
// 修改 record
app.post('/records/:id/edit', (req, res) => {
  res.send('修改 record')
})
// 刪除 record
app.post('/records/:id/delete', (req, res) => {
  res.send('刪除 record')
})

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})