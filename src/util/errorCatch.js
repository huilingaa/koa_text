
// 删除对象下面的某个属性，可以使用
// Reflect.deleteProperty(ctx.body, 'status')

module.exports = async app => {
  app.use(async (ctx, next) => {
    ctx.status = 200
    try {
      await next()
      if (!ctx.body) {
        ctx.throw('400', '路由不存在')
      }
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
