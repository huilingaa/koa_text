const { isReceiveEmptys } = require('../../plugins/common')
const jobType = require('../../data/jobType')
const { Apply } = require('../../utils/dbModelExports')

module.exports = async router => {

  /**
     * @swagger
     * /weapp/find_job_type:
     *   get:
     *     description: 小程序获取所有职位类型
     *     tags: [weapp]
     *     responses:
     *       200:
     *         description: 职位类型list
     *         schema:
     *           example:
     *              {"data": [{"name":"职位名","key":"icon"}]}
  */
  router.get('/weapp/find_job_type', async (ctx, next) => {
    ctx.body = jobType
    await next()
  })

  /**
     * @swagger
     * /weapp/find_job:
     *   get:
     *     description: 小程序获取所有职位
     *     tags: [weapp]
     *     parameters:
     *       - name: type
     *         type: string
     *         required: true
     *         description: 1获取最新数据 2获取热门数据
     *     responses:
     *       200:
     *         description: 职位list
     *         schema:
     *           example:
     *              {"data": [{}]}
  */
  router.get('/weapp/find_job', async (ctx, next) => {
    const { type } = ctx.query
    if (isReceiveEmptys(type)) {
      ctx.throw('400', '请传入获取数据type')
    }

    const jobTypeData = _.cloneDeep(jobType)

    let sort = { created_at: -1 }
    if (type == 2) {
      sort = { view_total: -1 }
    }

    let data = await Apply.find({
      status: '1',
    }, {
      job_name: 1,
      company_name: 1,
      company_size: 1,
      company_address: 1,
      tags: 1
    }).sort(sort).limit(10)
    ctx.body = data

    await next()
  })

  /**
     * @swagger
     * /weapp/find_job_details:
     *   post:
     *     description: 小程序获取岗位详情
     *     tags: [weapp]
     *     parameters:
     *       - name: id
     *         type: string
     *         required: true
     *         description: 该岗位的_id
     *     responses:
     *       200:
     *         description: 岗位详情数据
     *         schema:
     *           example:
     *              {"data": {} }
  */
  router.post('/weapp/find_job_details', async (ctx, next) => {
    const { id } = ctx.request.body
    if (isReceiveEmptys(id)) {
      ctx.throw('400', '请传入岗位id')
    }

    let data = await Apply.findById(id)
    ctx.body = data

    await next()
  })

  /**
     * @swagger
     * /weapp/find_job_list:
     *   post:
     *     description: 小程序获取岗位列表
     *     tags: [weapp]
     *     parameters:
     *       - name: keyword
     *         type: string
     *         description: 根据关键词搜索岗位
     *     responses:
     *       200:
     *         description: 岗位列表00数据
     *         schema:
     *           example:
     *              {"data": [] }
  */
  router.post('/weapp/find_job_list', async (ctx, next) => {
    const { keyword } = ctx.request.body || ''
    const reg = new RegExp(keyword, 'i')
    let data = await Apply.find({
      $or: [
        { job_name: { $regex: reg } },
        { company_name: { $regex: reg } },
        { company_address: { $regex: reg } },
        { people: { $regex: reg } },
        { content: { $regex: reg } },
        { tags: { $regex: reg } }
      ]
    }).sort({ created_at: -1 }).limit(10)
    ctx.body = data

    await next()
  })
}
