const { isReceiveEmptys } = require('../../plugins/common')
const { JobMessage } = require('../../utils/dbModelExports')
const FastScanner = require('../../plugins/fastScan')
const words = require('../../plugins/keywords.js')

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
    *              {message: "评论成功"}
    */
  router.post('/weapp/add_job_message', async (ctx, next) => {
    const { id, openid, content, parent } = ctx.request.body
    if (isReceiveEmptys(id, openid, content)) {
      ctx.throw('400', '请传入请求参数')
    }

    const scanner = new FastScanner(words)
    const checkPass = scanner.check(content)
    if (!checkPass) {
      ctx.throw('400', '回复内容违规')
    }

    const message = {
      job_id: id,
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

    /**
    * @swagger
    * /weapp/find_job_message:
    *   get:
    *     description: 小程序岗位评论列表
    *     tags: [weapp]
    *     parameters:
    *       - name: id
    *         type: string
    *         required: true
    *         description: 岗位id
    *     responses:
    *       200:
    *         description: 评论列表
    *         schema:
    *           example:
    *              {data: []}
    */
  router.get('/weapp/find_job_message', async (ctx, next) => {
    const { id } = ctx.query
    if (isReceiveEmptys(id)) {
      ctx.throw('400', '请传入岗位id')
    }

    const data = await JobMessage.find({
      job_id: id
    }, {
      job_id: 1,
      content: 1,
      openid: 1,
      parent: 1,
      created_at: 1
    })
    ctx.body = data
    await next()
  })
}
