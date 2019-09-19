const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

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
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render('index', { records: records })  // 將資料傳給 index 樣板
  })
})
// 列出全部 record
app.get('/records', (req, res) => {
  return res.redirect('/')
})
// 新增一筆 record 頁面
app.get('/records/new', (req, res) => {
  return res.render('new')
})
// 新增一筆  record
app.post('/records', (req, res) => {
  console.log(req.body)
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount
  })
  // 存入資料庫
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  // 新增完成後，將使用者導回首頁
  })
})
// 修改 record 頁面
app.get('/records/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: record })
  })
})
// 修改 record
app.post('/records/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name,
      record.category = req.body.category,
      record.date = req.body.date,
      record.amount = req.body.amount,
      record.save(err => {
        if (err) return console.error(err)
        return res.redirect('/')
      })
  })
})
// 刪除 record
app.post('/records/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

// 設定 express port 3000
app.listen(3000, () => {
  console.log('App is running')
})