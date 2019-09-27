const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  merchant: {
    type: String,
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  // 加入 userId，建立跟 User 的關聯
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }

})

module.exports = mongoose.model('Record', recordSchema)