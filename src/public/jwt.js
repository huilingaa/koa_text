const jwt = require('jsonwebtoken')
const { getReqIp } = require('./common')

const noVerificationRouters = ['/token']
// 不校验token的路由

// 校验请求者的token
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
        ctx.body = err.message
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
