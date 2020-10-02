const { jsonwebtokenSign } = require('../../plugins/jwt')
const { isReceiveEmptys, getCtxIp } = require('../../plugins/common')

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
  router.post('/login', async (ctx, next) => {
    console.log(ctx.request.files)
    const { username, password } = ctx.request.body
    if (isReceiveEmptys(username, password)) {
      ctx.throw('400', '用户名或密码不能为空')
    }
    ctx.body = jsonwebtokenSign({
      name: 'hjh',
      ip: getCtxIp(ctx.ip)
    })
    await next()
  })
}
