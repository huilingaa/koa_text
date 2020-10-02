const mongoose = require('mongoose')
// Schema,一种以文件形式存储的数据库模型骨架,不具备数据库的操作能力
const schema = new mongoose.Schema(
  {
    username: String,      //账号
    password: String,      // 密码
    phone:String,
    name:String,
    openid:{
        type: String,
        default: '0'
    },
    role_id:{              // 账号角色id
        type: mongoose.Schema.ObjectId,
        ref: 'Role'
    }
  },
  //createdAt 创建时间， updatedAt 表字段更新时间，versionKey 版本号
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false },
)

// Model,由Schema发布生成的模型,具有抽象属性和行为的数据库操作
module.exports = mongoose.model('User', schema)