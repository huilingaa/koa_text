const { isReceiveEmptys } = require('../../plugins/common')
const { Public } = require('../../utils/dbModelExports')
const jobType = require('../../data/jobType')

module.exports = async router => {

  /**
     * @swagger
     * /find_job_type:
     *   get:
     *     description: 获取所有职位类型
     *     tags: [public]
     *     responses:
     *       200:
     *         description: 职位类型list
     *         schema:
     *           example:
     *              {"data": [{"name":"职位名","key":"icon"}]}
  */
  router.get('/find_job_type', async (ctx, next) => {
    ctx.body = jobType
    await next()
  })
}
