const { isReceiveEmptys } = require('../../plugins/common')
const { WeappUser } = require('../../utils/dbModelExports')

module.exports = async router => {
  /**
    * @swagger
    * /weapp/add_job_message:
    *   post:
    *     description: 小程序岗位评论
    *     tags: [weapp]
    *     parameters:
    *       - name: openid
    *         type: string
    *         required: true
    *         description: 用户openid
    *     responses:
    *       200:
    *         description: 评论成功
    *         schema:
    *           example:
    *              {message: "评论成功"}
    */
  router.post('/weapp/set_user', async (ctx, next) => {
    const { openid, nickname, sex, avatar, city } = ctx.request.body
    if (isReceiveEmptys(openid)) {
      ctx.throw('400', 'openid不存在')
    }
    await WeappUser.findOneAndUpdate({
      openid: openid
    }, {
      openid: openid,
      nickname: nickname,
      sex: sex,
      avatar: avatar,
      city: city
    }, {
      upsert: true
    })

    // if (!data) {
    //   ctx.throw('400', '请授权用户信息')
    // }

    ctx.msg = '授权成功'
    await next()
  })
}
