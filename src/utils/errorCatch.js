module.exports = async app => {
  app.use(async (ctx, next) => {
    ctx.status = 200
    try {
      await next()
      if (!ctx.body) {
        ctx.throw(404, '未找到该接口')
      }

      if(!ctx.url.includes('.')) {
        let msg = ctx.message
        ctx.body = {
          data: ctx.body,
          message: msg,
          status: 200
        }
      }
    } catch (err) {
      ctx.app.emit('error', err, ctx)
    }
  })

  app.on('error', (err, ctx) => {
    ctx.body = {
      message: err.message,
      status: err.status || 500
    }
  })
}
