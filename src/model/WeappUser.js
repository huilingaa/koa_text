const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    openid: String, // 账号
    phone: String, // 手机号
    name: String, // 真实姓名
    nickname: String, // 昵称
    sex: String, // 性别
    avatar: String, // 头像
    autograph: String, // 签名
    age: String, // 年龄
    city: String // 所在城市
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false }
)

module.exports = mongoose.model('WeappUser', schema)
