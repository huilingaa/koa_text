const Koa = require('koa')
const os = require('os')

const app = new Koa()

app.use(ctx => {
  ctx.body = 'Hello Koa'
})

/* 启动 */
const port = 3000
const network = os.networkInterfaces()
const localhost = network[Object.keys(network)[0]][1].address
app.listen(3000, () => {
  console.log(`运行中： http://localhost:${port}`)
  console.log(`运行中： http://${localhost}:${port}`)
})
