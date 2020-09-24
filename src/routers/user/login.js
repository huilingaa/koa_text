const { jsonwebtokenSign } = require('../../public/jwt')

module.exports = async router => {
  router.get('/token', (ctx, next) => {
    ctx.body = jsonwebtokenSign({
      name: 'hjh'
    })
  })
}
