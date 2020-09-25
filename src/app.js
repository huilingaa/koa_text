const Koa = require('koa')
const os = require('os')
const cors = require('@koa/cors')
const logger = require('koa-logger')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const { koaSwagger } = require('koa2-swagger-ui')
const { tokenVerification } = require('./public/jwt')

global.secretOrPrivateKey = 'xstxhjh'

const app = new Koa()
app.use(cors())
// 数据处理，支持文件上传 https://github.com/dlau/koa-body
app.use(logger())
// 日志
app.use(koaBody())
// gzip 压缩
app.use(compress({ threshold: 2048 }))

// 生成api文档
app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json'
  }
}))
const swagger = require('../util/swagger')
app.use(swagger.routes(), swagger.allowedMethods())

// 全局捕获错误
require('../util/errorCatch.js')(app)

// 校验token
app.use(tokenVerification())

require('./routers/index.js')(app)

app.use((ctx) => {
  // 返回数据格式处理
  const status = ctx.body && ctx.body.status
  Reflect.deleteProperty(ctx.body, 'status')
  ctx.body = {
    status: status || 200,
    data: ctx.body
  }
})

/* 启动 */
const port = 3000
const network = os.networkInterfaces()
const localhost = network[Object.keys(network)[0]][1].address
app.listen(3000, () => {
  console.log(`运行中: http://localhost:${port}`)
  console.log(`        http://${localhost}:${port}`)
})
