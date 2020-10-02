const { jsonwebtokenSign } = require('../../plugins/jwt')
const { isReceiveEmptys, getCtxIp } = require('../../plugins/common')
const { Public } = require('../../utils/dbModelExports')

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
  router.post('/find_job_type', async (ctx, next) => {

    await next()
  })
}
