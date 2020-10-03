const { isReceiveEmptys } = require('../../plugins/common')
const jobType = require('../../data/jobType')

module.exports = async router => {

  /**
     * @swagger
     * /find_job_type:
     *   get:
     *     description: 登录获取token
     *     tags: [jobType]
     *     responses:
     *       200:
     *         data: 职位类型list
  */
  router.get('/weapp/find_job_type', async (ctx, next) => {
    ctx.body = jobType
    await next()
  })
}
