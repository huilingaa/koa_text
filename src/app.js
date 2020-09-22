const Koa = require('koa')
const os = require('os')
const Router = require('koa-router')

const app = new Koa()

/* 路由处理 */
const router = new Router()
router.get('/',
  (ctx, next) => {
    console.log(ctx)
    next()
  })

app
  .use(router.routes())
  .use(router.allowedMethods())

/* 启动 */
const port = 3000
const network = os.networkInterfaces()
const localhost = network[Object.keys(network)[0]][1].address
app.listen(3000, () => {
  console.log(`运行中： http://localhost:${port}`)
  console.log(`         http://${localhost}:${port}`)
})
