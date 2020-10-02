const Koa = require('koa')
const os = require('os')
const path = require('path')
const _ = require('lodash')
const cors = require('@koa/cors')
const serve = require('koa-static')
const logger = require('koa-logger')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const { koaSwagger } = require('koa2-swagger-ui')
const { tokenVerification } = require('./plugins/jwt')

global.secretOrPrivateKey = 'xstxhjh'
global._ = _

require('./plugins/db')() // 连接数据库

const app = new Koa()
app.use(cors())
// 数据处理，支持文件上传 https://github.com/dlau/koa-body

const staticPath = './static'
// 静态资源
app.use(serve(
  path.join(__dirname, staticPath)
))

app.use(logger())
// 日志
app.use(koaBody({ multipart: true }))
// gzip 压缩
app.use(compress({ threshold: 2048 }))

// 生成api文档
app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json'
  }
}))
const swagger = require('./utils/swagger')
app.use(swagger.routes(), swagger.allowedMethods())

// 全局捕获错误及数据返回格式处理 中间件
require('./utils/errorCatch.js')(app)

// 校验token
app.use(tokenVerification())

require('./utils/routersApi.js')(app)

/* 启动 */
const port = 3000
const network = os.networkInterfaces()
const localhost = network[Object.keys(network)[0]][1].address
app.listen(3000, () => {
  console.log(`运行中: http://localhost:${port}`)
  console.log(`        http://${localhost}:${port}`)
})
