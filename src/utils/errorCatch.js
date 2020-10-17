module.exports = async app => {
  app.use(async (ctx, next) => {
    ctx.status = 200
    try {
      await next()
      console.log(ctx.type)
      if (ctx.type == 'application/json') {
        const msg = ctx.msg
        const data = ctx.body
        ctx.body = {
          data: data,
          message: msg,
          status: 200
        }
      }
    } catch (err) {
      console.error(err)
      const status = err.status || 500
      ctx.status = status
      ctx.body = {
        message: err.message,
        status: status
      }
    }
  })
}
