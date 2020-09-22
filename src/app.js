const Koa = require('koa')
const os = require('os')
const Router = require('@koa-router')
const koaBody = require('koa-body')
// https://github.com/dlau/koa-body 支持文件上传
const cors = require('@koa/cors')
const CSRF = require('koa-csrf')

const app = new Koa()
app.use(koaBody())
app.use(cors())
app.use(new CSRF({
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
  disableQuery: false
}))

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
