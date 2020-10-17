const { Apply } = require('../../utils/dbModelExports')
const { isReceiveEmptys, setUpload } = require('../../plugins/common')
const jobType = require('../../data/jobType')

module.exports = async router => {
  /**
     * @swagger
     * /public/set_apply:
     *   post:
     *     description: set_apply 招聘发布-申请
     *     tags: [User]
     *     parameters:
     *       - name: job_name
     *         type: string
     *         required: true
     *         description: 职位名称
     *       - name: company_name
     *         type: string
     *         required: true
     *         description: 公司名称
     *       - name: company_address
     *         type: string
     *         required: true
     *         description: 公司地址
     *       - name: company_size
     *         type: string
     *         required: true
     *         description: 公司规模
     *       - name: phone
     *         type: string
     *         required: true
     *         description: 手机号
     *       - name: people
     *         type: string
     *         required: true
     *         description: 联系人
     *       - name: email
     *         type: string
     *         required: true
     *         description: 邮箱
     *       - name: content
     *         type: string
     *         required: true
     *         description: 富文本
     *       - name: data_type
     *         type: string
     *         required: true
     *         description: 数据引入类型
     *       - name: job_type_id
     *         type: string
     *         required: true
     *         description: 职位类型
     *       - name: tags
     *         type: string
     *         required: true
     *         description: 岗位标签
     *       - name: img
     *         type: string
     *         required: true
     *         description: 营业执照
     *     responses:
     *       200:
     *         description: 返回用户信息及token
     *         schema:
     *           example:
     *              {message:'发布成功'}
  */
  // 申请
  router.post('/public/set_apply', async (ctx, next) => {
    const img = ctx.request.files.img
    const { data } = ctx.request.body
    const { company_address, company_name, company_size, content, data_type, email, job_name, job_type_id, people, phone, tags } = JSON.parse(data)
    if (isReceiveEmptys(company_address, company_name, company_size, content, data_type, email, job_name, job_type_id, people, phone, tags)) {
      ctx.throw('400', '缺少上传参数！')
    }
    const files = setUpload(img, 'jobApply', company_name)
    const applyData = await Apply.create({
      company_address,
      company_name,
      company_size,
      content,
      data_type,
      email,
      job_name,
      job_type_id,
      people,
      phone,
      tags,
      files: [files]
    })
    if (applyData) {
      ctx.msg = '发布成功'
    } else {
      ctx.throw('400', '发布失败')
    }
    await next()
  })

  /**
     * @swagger
     * /pull_apply:
     *   post:
     *     description: pull_apply 招聘发布-申请
     *     tags: [User]
     *     parameters:
     *       - name: start_time
     *         type: string
     *         required: true
     *         description: 开始时间
     *       - name: end_time
     *         type: string
     *         required: true
     *         description: 结束时间
     *     responses:
     *       200:
     *         description: 返回用户信息及token
     *         schema:
     *           example:
     *              {"data":[{
     *                "_id":"5f8b2212e460081b6a383028",
     *                "status":"0",
     *                "view_total":0,
     *                "tags":["技术大牛","扁平化管理","成长空间大"],
     *                "files":"http://101.132.166.73:8812/uploads/jobApply/1602953746433武汉创腾科技有限责任公司.png",
     *                "company_address":"武汉光谷软件园10A-405","company_name":"武汉创腾科技有限责任公司",
     *                "company_size":"20-99人","content":"<ul><li><span style=\"color: rgb(230, 0, 0); background-color: rgb(178, 178, 0);\">宿舍的发送到发送到发送到发送到</span></li></ul>",
     *                "data_type":"1",
     *                "email":"739803697@qq.com",
     *                "job_name":"前端开发",
     *                "job_type_id":"技术类",
     *                "people":"彭于晏",
     *                "phone":"18126473030",
     *                "created_at":"2020-10-17T16:55:46.436Z",
     *                "updated_at":"2020-10-17T16:55:46.436Z"}]}
  */

  // 拉取招聘信息
  router.post('/pull_apply', async (ctx, next) => {
    const { start_time, end_time } = ctx.request.body
    if (isReceiveEmptys(start_time, end_time)) {
      ctx.throw('400', '缺少上传参数！')
    }
    var find_start_time = moment(moment(new Date(start_time)).format('YYYY-MM-DD 00:00:00'))._d
    var find_end_time = moment(moment(new Date(end_time)).format('YYYY-MM-DD 23:59:59'))._d
    console.log(find_start_time, find_end_time)
    const data = await Apply.find({
      $and: [
        {
          created_at: {
            $gte: find_start_time,
            $lte: find_end_time
          }
        },
        {
          status: 0
        }
      ]
    }).lean()
    data.map(item => {
      item.files = `${imgurl}${item.files}`
      const jobTypeObj = jobType.find(t => {
        return t.key == item.job_type_id
      })
      item.job_type_id = jobTypeObj.name
      return item
    })
    ctx.body = data
    await next()
  })

  /**
   * @swagger
   * /public/set_apply:
   *   post:
   *     description: modify_table 拉取招聘信息
   *     tags: [User]
   *     parameters:
   *       - name: ids
   *         type: Array
   *         required: true
   *         description: 操作数据的id
   *       - name: status
   *         type: string
   *         required: true
   *         description: 操作状态 1通过 2拒绝
   *     responses:
   *       200:
   *         description: 返回用户信息及token
   *         schema:
   *           example:
   *            {message: '操作成功!'}
   *
*/

  // 拉取招聘信息
  router.post('/modify_table', async (ctx, next) => {
    const { ids, status } = ctx.request.body
    if (isReceiveEmptys(ids, status)) {
      ctx.throw('400', '缺少上传参数！')
    }
    const data = await Apply.find({ _id: { $in: ids } }).lean()
    await Promise.all(data.map(async (item) => {
      await Apply.findOneAndUpdate({ _id: ObjectId(item._id) }, { status: status })
    }))
    ctx.msg = '操作成功!'
    await next()
  })
}
