// routes/record.js
const express = require('express')
const router = express.Router()
const Record = require('../models/record')

// 設定首頁路由
router.get('/', (req, res) => {
  Record.find((err, records) => {
    if (err) return console.error(err)
    return res.render('index', { records: records })  // 將資料傳給 index 樣板
  })
})

module.exports = router