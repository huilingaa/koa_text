const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    name: String, // 公共数据名称
    key: String, // 公共数据key
    data: Array // 公共数据存储
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false }
)

module.exports = mongoose.model('Public', schema)
