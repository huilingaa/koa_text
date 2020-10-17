const jwt = require('jsonwebtoken')
const { getCtxIp } = require('./common')

const noVerificationRouters = ['/login',
  '/upload_xlsx',
  '/set_apply',
  '/find_job_type',
  '/pull_apply',
  '/modify_table'
]
// 不校验token的路由

// 校验请求者的token 中间件
const tokenVerification = async (ctx, next) => {
  const token = ctx.get('token')

  if (
    noVerificationRouters.includes(ctx.url) ||
        ctx.url.includes('/weapp') ||
        ctx.url.includes('/swagger') ||
        ctx.url.includes('/test') ||
        ctx.url.includes('/public') ||
        ctx.url.includes('.')
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
