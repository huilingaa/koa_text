const { isReceiveEmptys } = require('../../plugins/common')
const { JobMessage } = require('../../utils/dbModelExports')

module.exports = async router => {
  /**
    * @swagger
    * /weapp/add_job_message:
    *   post:
    *     description: 小程序岗位评论
    *     tags: [weapp]
    *     parameters:
    *       - name: id
    *         type: string
    *         required: true
    *         description: 岗位id
    *       - name: openid
    *         type: string
    *         required: true
    *         description: 用户openid
    *       - name: content
    *         type: string
    *         required: true
    *         description: 评论内容
    *       - name: parent
    *         type: string
    *         description: 父级id
    *     responses:
    *       200:
    *         description: 评论成功
    *         schema:
    *           example:
    *              {"message": "评论成功"}
    */
  router.post('/weapp/add_job_message', async (ctx, next) => {
    const { id, openid, content, parent } = ctx.request.body
    if (isReceiveEmptys(id, openid, content)) {
      ctx.throw('400', '请传入请求参数')
    }

    const message = {
      comment_id: id,
      openid: openid,
      content: content
    }
    if (parent) {
      message.parent = parent
    }
    const data = await JobMessage.create(message)
    if (data) {
      ctx.msg = '评论成功'
    } else {
      ctx.throw('400', '评论失败')
    }
    await next()
  })
}
