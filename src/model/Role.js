const mongoose = require('mongoose')
// 角色基本信息
const schema = new mongoose.Schema(
  {
    name: String, // 角色 名称
    resume: String // 角色 简述
    // powers: Array,
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false }
)

module.exports = mongoose.model('Role', schema)
