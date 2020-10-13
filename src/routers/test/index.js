const xlsx = require('xlsx')
const fs = require('fs')

const { Apply } = require('../../utils/dbModelExports')
module.exports = async router => {
  router.post('/upload_xlsx', async (ctx, next) => {
    const file = ctx.request.files.title // 获取上传文件
    const reader = fs.createReadStream(file.path) // 创建可读流
    const ext = file.name.split('.').pop() // 获取上传文件扩展名
    const filePath = `./init.${ext}`
    const upStream = fs.createWriteStream(filePath) // 创建可写流
    await getFile(reader, upStream) // 等待数据存储完成
    const workbook = xlsx.readFile(filePath)

    let data = [] // 可能存在多个sheet的情况
    const sheetNames = workbook.SheetNames // 返回 ['sheet1', ...]
    for (const sheetName of sheetNames) {
      const worksheet = workbook.Sheets[sheetName]
      data = xlsx.utils.sheet_to_json(worksheet)
    }
    console.log(data.length)
    data.map(item => {
      item.job_name = item['招聘公告名称']
      item.company_name = item['单位名称'] || 1
      item.company_size = ''
      item.company_address = item['工作城市']
      item.phone = item['联系电话'] || ''
      item.people = item['单位联系人'] || ''
      item.email = ''
      item.content = item['招聘公告详情'] // 富文本 招聘描述
      item.status = '1' // 审核状态
      item.data_type = '2' // 数据类型 1申请 2导入JSON
      item.job_type_id = '' // 职位类型id
      item.view_total = '0' // 查看统计
      item.tags = [] // 岗位标签
      item.files = [] // 上传文件'
      Reflect.deleteProperty(item, '编号')
      Reflect.deleteProperty(item, '招聘公告名称')
      Reflect.deleteProperty(item, '招聘公告详情')
      Reflect.deleteProperty(item, '工作城市')
      Reflect.deleteProperty(item, '行业类别')
      Reflect.deleteProperty(item, '单位名称')
      Reflect.deleteProperty(item, '单位性质')
      Reflect.deleteProperty(item, '单位联系人')
      Reflect.deleteProperty(item, '联系电话')
      Reflect.deleteProperty(item, '手机')
      Reflect.deleteProperty(item, '查看次数')
      Reflect.deleteProperty(item, '收藏次数')
      Reflect.deleteProperty(item, '更新时间')
      return item
    })
    const datas = data.filter(item => {
      return (item.company_name != '1' && item.content)
    })
    const list = await Apply.insertMany(datas)
    ctx.body = list
    await next()
  })
}

function getFile (reader, upStream) {
  return new Promise(function (resolve, reject) {
    const stream = reader.pipe(upStream) // 可读流通过管道写入可写流
    stream.on('finish', function (err) {
      reject(err)
    })
  })
}
