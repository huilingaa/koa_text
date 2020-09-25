
module.exports = async app => {
  app.use(async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.app.emit('error', err, ctx)
    }
  })
  app.on('error', (err, ctx) => {
    console.log(err)
    ctx.body = {
      message: err.message,
      status: err.status || 500
    }
  })
}
