const Koa = require('koa')
const os = require('os')
const cors = require('@koa/cors')
const compress = require('koa-compress')
const koaBody = require('koa-body')
const { koaSwagger } = require('koa2-swagger-ui')
const { tokenVerification } = require('./public/jwt')

global.secretOrPrivateKey = 'xstxhjh'

const app = new Koa()
app.use(cors())
app.use(koaBody())
// 数据处理，支持文件上传 https://github.com/dlau/koa-body
app.use(compress({ threshold: 2048 }))
// gzip 压缩

app.use(koaSwagger({
  routePrefix: '/swagger',
  swaggerOptions: {
    url: '/swagger.json'
  }
}))
const swagger = require('../util/swagger')
app.use(swagger.routes(), swagger.allowedMethods())

app.use(tokenVerification())

require('./routers/index.js')(app)

/* 启动 */
const port = 3000
const network = os.networkInterfaces()
const localhost = network[Object.keys(network)[0]][1].address
app.listen(3000, () => {
  console.log(`运行中: http://localhost:${port}`)
  console.log(`        http://${localhost}:${port}`)
})
