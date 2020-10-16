const fs = require('fs')
const xlsx = require('xlsx')

const { Apply, User, Role } = require('../../utils/dbModelExports')
const { isReceiveEmptys } = require('../../plugins/common')
const { Encrypt } = require('../../plugins/lock')

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

  // mongodb测试数据生成
  router.get('/test/set_user', async (ctx, next) => {
    const { name, password } = ctx.query
    if (isReceiveEmptys(name, password)) {
      ctx.throw('400', '缺少参数')
    }

    const data = await Role.findOne({ name: name })
    if (isReceiveEmptys(data)) {
      ctx.throw('400', '暂无角色！')
    }
    await User({
      username: 'admin', // 账号
      password: Encrypt(password), // 密码
      phone: '18126473030',
      name: '彭于晏',
      role_id: ObjectId(data._id)
    }).save()
    ctx.body = {
      data: 'ok'
    }
    await next()
  })

  // role
  router.get('/test/set_role', async (ctx, next) => {
    const { name, resume } = ctx.query
    if (isReceiveEmptys(name, resume)) {
      ctx.throw('400', '缺少参数')
    }
    const data = await Role.findOneAndUpdate({ name: name }, {
      name: name,
      resume: resume
    }, { new: true })
    ctx.body = {
      data: data
    }
    await next()
  })
  // 获取 weapp  token key
  // router.post('/weapp/aaaaa', async (ctx, next) => {
  //   const code = ctx.request.body.js_code
  //   if (isReceiveEmptys(code)) {
  //     ctx.throw('400', 'code不能为空')
  //   }
  //   let post = {}
  //   const newtime = moment().subtract(1, 'hour').valueOf()
  //   if (weapp_access_token.time < newtime) {
  //     const url = `${APP_URL}?appid=${APP_ID}&secret=${APP_SECRET}&js_code=${code}&grant_type=authorization_code`
  //     post = await axios.post(url)
  //     weapp_access_token.time = moment().valueOf()
  //     weapp_access_token.session_key = post.data.session_key
  //     ctx.body = post.data
  //   } else {
  //     ctx.body = weapp_access_token
  //   }
  //   console.log('----', weapp_access_token)
  //   await next()
  // })
}

function getFile (reader, upStream) {
  return new Promise(function (resolve, reject) {
    const stream = reader.pipe(upStream) // 可读流通过管道写入可写流
    stream.on('finish', function (err) {
      reject(err)
    })
  })
}
