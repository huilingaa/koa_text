const Koa = require('koa')
const os = require('os')
const cors = require('@koa/cors')
const koaBody = require('koa-body')
// https://github.com/dlau/koa-body 支持文件上传
const { tokenVerification } = require('./public/jwt')

global.secretOrPrivateKey = 'xstxhjh'

const app = new Koa()
app.use(cors())
app.use(koaBody())

app.use(tokenVerification())

require('./routers/index.js')(app)

/* 启动 */
const port = 3000
const network = os.networkInterfaces()
const localhost = network[Object.keys(network)[0]][1].address
app.listen(3000, () => {
  console.log(`运行中： http://localhost:${port}`)
  console.log(`         http://${localhost}:${port}`)
})
