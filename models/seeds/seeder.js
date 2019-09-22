const mongoose = require('mongoose')
const User = require('../user')
const Record = require('../record')
const userJson = require('./user.json')
const expenseRecordJson = require('./expenseRecord')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost/record', { useUnifiedTopology: true, useNewUrlParser: true })

const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')

  User.create(userJson).then(() =>

    User.find({ email: 'user1@example.com' }, (err, user) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user[0].password, salt, (err, hash) => {
          if (err) throw err
          user[0].password = hash
          user[0].save()
        })
      })

      for (let i = 0; i < expenseRecordJson.length; i++) {
        expenseRecordJson[i]["userId"] = user[0]._id.toString()
      }

    })

  ).then(() =>
    Record.create(expenseRecordJson, () => {
      console.log('done')
    })
  )

})