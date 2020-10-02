const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    job_name: String,               // 职位名称
    company_name: String,           // 公司名称
    company_address: String,        // 公司地址
    phone: String,                  // 手机号
    email: String,                  // 邮箱
    content: String,                // 富文本 招聘描述
    status: String,                 // 审核状态
    data_type: String,              // 数据类型 1申请 2导入JSON
    view_total: Number,             // 查看统计 
    tags: Array,                    // 岗位标签
    files: Array,                   // 上传文件
    job_type_id: {                  // 职位类型id
      type: mongoose.Schema.ObjectId,
      ref: 'JobType'
    },
    user_id: {                       // 账号id
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false },
)

module.exports = mongoose.model('User', schema)