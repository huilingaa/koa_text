const fs = require('fs')
const path = require('path')
const Router = require('@koa/router')
const router = new Router()

module.exports = async app => {
  const dirPath = (url = '') => {
    return path.resolve(__dirname, `../routers/${url}`)
  }
  const dirData = fs.readdirSync(dirPath())

  dirData.map(item => {
    if (item.includes('.')) return
    const allApi = fs.readdirSync(dirPath(item))

    allApi.map(aItem => {
      const fn = require(dirPath(`${item}/${aItem}`))
      if (typeof fn === 'function') fn(router)
    })
  })

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
