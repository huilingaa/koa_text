const fs = require('fs')
const path = require('path')
const Router = require('@koa/router')
const router = new Router()

const dirPath = (url = '') => {
  return path.resolve(__dirname, `../routers/${url}`)
}

const recursion = (path = '') => {
  const dirData = fs.readdirSync(dirPath(path))
  dirData.map(item => {
    const nextPath = `${path}/${item}`
    if (item.includes('.')) {
      const fn = require(dirPath(nextPath))

      // 防止第一层index死循环
      if (nextPath == '/index.js') return

      if (typeof fn === 'function') fn(router)
    } else {
      recursion(nextPath)
    }
  })
}

module.exports = async app => {
  recursion()

  app
    .use(router.routes())
    .use(router.allowedMethods())
}
