const { isReceiveEmptys } = require('../../plugins/common')
const { Public } = require('../../utils/dbModelExports')

module.exports = async router => {

  /**
     * @swagger
     * /find_job_type:
     *   post:
     *     description: 登录获取token
     *     tags: [jobType]
     *     responses:
     *       200:
     *         data: 职位类型list
  */
  router.post('/find_job_type', async (ctx, next) => {
    let data = await Public.create({
      name: '招聘类型',
      key: 'jobType',
      data: []
    })
    ctx.body = data
    await next()
  })
}
