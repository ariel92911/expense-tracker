// routes/record.js
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 設定 /records 路由
// 列出全部 record
router.get('/', (req, res) => {
  return res.redirect('/')
})

// 新增一筆 record 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 新增一筆  record 動作
router.post('/', (req, res) => {
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
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    return res.render('edit', { record: record })
  })
})

// 修改 record 動作
router.post('/:id/edit', (req, res) => {
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
router.post('/:id/delete', (req, res) => {
  Record.findById(req.params.id, (err, record) => {
    if (err) return console.error(err)
    record.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
