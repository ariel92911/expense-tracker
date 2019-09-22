// routes/record.js
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 載入 auth middleware
const { authenticated } = require('../config/auth')

let type = '1'
let month = '01'

// 設定 /records 路由
// 列出全部 record
router.get('/', authenticated, (req, res) => {
  return res.redirect('/')
})

// 列出特定類別 record
router.get('/category/:item', authenticated, (req, res) => {
  let category = ''
  var itemSplit = req.params.item.split('_')
  let categorySelect = itemSplit[0]
  switch (categorySelect) {
    case 'type':
      type = itemSplit[1]
      break;
    case 'month':
      month = itemSplit[1]
      break;
  }

  switch (type) {
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
  //Document docu
  let arrary = []
  Record.find({ 'category': category, userId: req.user._id }, (err, records) => {
    let totalAmount = 0
    for (let i = 0; i < records.length; i++) {
      var dataSplit = records[i].date.split('-')
      if (month !== dataSplit[1]) {
        records[i].category = '-1'
        continue
      }
      else {
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
        arrary.push(records[i])
      }
    }

    if (err) return console.error(err)
    return res.render('category', { records: arrary, totalAmount })
  })
})

// 新增一筆 record 頁面
router.get('/new', authenticated, (req, res) => {
  return res.render('new')
})

// 新增一筆  record 動作
router.post('/', authenticated, (req, res) => {
  const record = new Record({
    name: req.body.name,
    merchant: req.body.merchant,
    category: req.body.category,
    date: req.body.date,
    amount: req.body.amount,
    // 儲存 userId
    userId: req.user._id
  })
  record.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')
  })
})

// 修改 record 頁面
router.get('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: record })
  })
})

// 修改 record 動作
router.post('/:id/edit', authenticated, (req, res) => {
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.name = req.body.name,
      record.merchant = req.body.merchant,
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
  Record.findOne({ _id: req.params.id, userId: req.user._id }, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
