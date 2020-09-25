const jwt = require('jsonwebtoken')
const { getReqIp } = require('./common')

const noVerificationRouters = ['/login']
// 不校验token的路由

// 校验请求者的token 中间件
function tokenVerification () {
  return async (ctx, next) => {
    const ip = getReqIp(ctx.req)
    const token = ctx.get('token')

    if (noVerificationRouters.includes(ctx.url)) {
      next()
      return
    }
    console.log(ip, token)

    jwt.verify(token, global.secretOrPrivateKey, (err, decode) => {
      if (err) {
        ctx.throw('400', 'token 已失效')
      } else {
        next()
      }
    })
  }
}

function jsonwebtokenSign (data = {}) {
  return jwt.sign(data, global.secretOrPrivateKey, { expiresIn: '7d' })
}

module.exports = {
  jsonwebtokenSign,
  tokenVerification
}
