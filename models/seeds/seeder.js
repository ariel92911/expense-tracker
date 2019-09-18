const mongoose = require('mongoose')
const Record = require('../record')

mongoose.connect('mongodb://localhost/record', { useNewUrlParser: true })

const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')

  for (let i = 0; i < 10; i++) {
    Record.create({ name: 'name-' + i })
  }


  console.log('done')
})