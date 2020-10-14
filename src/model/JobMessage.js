const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    content: String, // 内容
    openid: String, // 用户微信小程序唯一id
    parent: { // 父级
      type: mongoose.Schema.ObjectId,
      ref: 'JobMessage'
    },
    comment_id: { // 岗位id
      type: mongoose.Schema.ObjectId,
      ref: 'Community'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false }
)

module.exports = mongoose.model('JobMessage', schema)
