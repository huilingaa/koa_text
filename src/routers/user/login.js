const { jsonwebtokenSign } = require('../../public/jwt')

/**
   * @swagger
   * /user:
   *   post:
   *     description: 获取token
   *     tags: [User]
   *     responses:
   *       200:
   *         description: 返回用户信息
   */
module.exports = async router => {
  router.post('/token', (ctx, next) => {
    ctx.body = jsonwebtokenSign({
      name: 'hjh'
    })
  })
}
