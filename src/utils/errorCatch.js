module.exports = async app => {
  app.use(async (ctx, next) => {
    ctx.status = 200
    try {
      await next()
      if (!ctx.body && !ctx.msg) {
        ctx.throw(404, '未找到该接口')
      }

      if (!ctx.url.includes('.')) {
        const msg = ctx.msg
        const data = ctx.body
        ctx.body = {
          data: data,
          message: msg,
          status: 200
        }
      }
    } catch (err) {
      const status = err.status || 500
      ctx.status = status
      ctx.body = {
        message: err.message,
        status: status
      }
    }
  })
}
