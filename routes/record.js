// routes/record.js
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 載入 auth middleware
const { authenticated } = require('../config/auth')

// 設定 /records 路由
// 列出全部 record
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

// 列出特定類別 record
router.get('/category/:item', authenticated, (req, res) => {
  let category = ''
  switch (req.params.item) {
    case '1':
      category = '家居物業'
      break;
    case '2':
      category = '交通出行'
      break;
    case '3':
      category = '休閒娛樂'
      break;
    case '4':
      category = '餐飲食品'
      break;
    case '5':
      category = '其他'
      break;
  }

  Record.find({ 'category': category }, (err, records) => {
    let totalAmount = 0
    for (let i = 0; i < records.length; i++) {
      totalAmount += records[i].amount
      switch (records[i].category) {
        case '家居物業':
          records[i].category = '<i class="fas fa-home fa-3x"></i>'
          break;
        case '交通出行':
          records[i].category = '<i class="fas fa-shuttle-van fa-3x"></i>'
          break;
        case '休閒娛樂':
          records[i].category = '<i class="fas fa-grin-beam fa-3x"></i>'
          break;
        case '餐飲食品':
          records[i].category = '<i class="fas fa-utensils fa-3x"></i>'
          break;
        case '其他':
          records[i].category = '<i class="fas fa-pen fa-3x"></i>'
          break;
      }
    }
    if (err) return console.error(err)
    return res.render('category', { records: records, totalAmount })
  })
})

// 新增一筆 record 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆  record 動作
router.post('/', authenticated, (req, res) => {
  console.log(req.body)
  const record = new Record({
    name: req.body.name,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改 record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: record })
  })
})

// 修改 record 動作
router.post('/:id/edit', authenticated, (req, res) => {
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

// 刪除 record 動作
router.post('/:id/delete', authenticated, (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
