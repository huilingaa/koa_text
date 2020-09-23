const jwt = require('jsonwebtoken')
const { getReqIp } = require('./common')

// 校验请求者的token
function tokenVerification () {
  // jwt.verify(token, global.secretOrPrivateKey, (err, decode) => {
  //   if (err) {
  //     return 'err'
  //   }
  //   console.log(ip, decode)
  // })
  return async (ctx, next) => {
    const ip = getReqIp(ctx.req)
    const token = ctx.get('token')
    console.log(ip, token)
    await next()
  }
}

function jsonwebtokenSign (data = {}) {
  return jwt.sign(data, global.secretOrPrivateKey, { expiresIn: '7d' })
}

module.exports = {
  jsonwebtokenSign,
  tokenVerification
}
