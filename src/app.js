const Koa = require('koa')
const os = require('os')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const jwt = require('koa-jwt')
const koaBody = require('koa-body')
// https://github.com/dlau/koa-body 支持文件上传

const app = new Koa()
const router = new Router()
app.use(cors())
app.use(koaBody())
app
  .use(router.routes())
  .use(router.allowedMethods())

// 不受保护的
router.get('/', (ctx, next) => {
  ctx.body = 'hello world'
})

app.use(jwt({ secret: 'shared-secret' }))

// 受到保护的
router.get('/token', (ctx, next) => {
  ctx.body = ctx
})

/* 启动 */
const port = 3000
const network = os.networkInterfaces()
const localhost = network[Object.keys(network)[0]][1].address
app.listen(3000, () => {
  console.log(`运行中： http://localhost:${port}`)
  console.log(`         http://${localhost}:${port}`)
})
