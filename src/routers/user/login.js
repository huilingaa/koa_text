const { jsonwebtokenSign } = require('../../plugins/jwt')
const { isReceiveEmptys, getCtxIp } = require('../../plugins/common')

module.exports = async router => {

  /**
     * @swagger
     * /login:
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
     *         schema:
     *           example:
     *              {"data": ""}
  */
 
  router.post('/login', async (ctx, next) => {
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
