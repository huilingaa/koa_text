const { jsonwebtokenSign } = require('../../plugins/jwt')
const { getCtxIp } = require('../../plugins/common')

/**
   * @swagger
   * /login:
   *   required:
   *     - username
   *     - password
   *   post:
   *     description: 登录获取token
   *     tags: [User]
   *     parameters:
   *       - name: username
   *         type: string
   *         required: true
   *         description: 用户账号
   *       - name: password
   *         type: string
   *         required: true
   *         description: 用户密码
   *     responses:
   *       200:
   *         description: 返回用户信息及token
   */
module.exports = async router => {
  router.post('/login', (ctx, next) => {
    ctx.body = jsonwebtokenSign({
      name: 'hjh',
      ip: getCtxIp(ctx.ip)
    })
    next()
  })
}
