const { isReceiveEmptys } = require('../../plugins/common')
const jobType = require('../../data/jobType')

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
     *     responses:
     *       200:
     *         description: 职位list
     *         schema:
     *           example:
     *              {"data": [{"name":"职位名","key":"icon"}]}
  */
  router.get('/weapp/find_job', async (ctx, next) => {
    const data = _.cloneDeep(jobType)
    data[0].name = 'test'
    ctx.body = 'test'
    await next()
  })
}
