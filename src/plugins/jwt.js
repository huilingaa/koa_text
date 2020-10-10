const jwt = require('jsonwebtoken')
const { getCtxIp } = require('./common')

const noVerificationRouters = ['/login', '/upload_xlsx']
// 不校验token的路由

// 校验请求者的token 中间件
const tokenVerification = async (ctx, next) => {
  const token = ctx.get('token')

  if (
    noVerificationRouters.includes(ctx.url) ||
    ctx.url.includes('/weapp') ||
    ctx.url.includes('/swagger')
  ) {
    await next()
    return
  }

  await jwt.verify(token, global.secretOrPrivateKey, async (err, decode) => {
    const ip = getCtxIp(ctx.ip)
    if (err || decode.ip !== ip) {
      ctx.throw('400', 'token 已失效')
    } else {
      await next()
    }
  })
}

function jsonwebtokenSign (data = {}) {
  return jwt.sign(data, global.secretOrPrivateKey, { expiresIn: '7d' })
}

module.exports = {
  jsonwebtokenSign,
  tokenVerification
}

// const FastScanner = require('./plugins/fastScan')

// const words = ['今日头条', '微信', '支付宝']
// const scanner = new FastScanner(words)
// const content = '今日头条小程序终于来了，这是继微信、支付宝、百度后，第四个推出小程序功能的App。猫眼电影率先试水，出现在今日头条。'
// const offWords = scanner.search(content)
// console.log(offWords)
// const hits = scanner.hits(content)
// console.log(hits)
