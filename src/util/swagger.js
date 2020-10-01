const path = require('path')
const router = require('@koa/router')() // 引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerDefinition = {
  info: {
    title: '接口',
    version: '1.0.0',
    description: 'API'
  },
  host: 'localhost:3000',
  basePath: '/'
}
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../src/routers/*/*.js')]
}
const swaggerSpec = swaggerJSDoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.body = swaggerSpec
})

module.exports = router
