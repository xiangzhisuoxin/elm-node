const v1 = require('./v1')
const users = require('./users')
const test = require('./test')
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  /*await ctx.render('index', {
    title: 'Hello Koa 2!'
  })*/
  ctx.body = 'connected'
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

// module.exports = router
module.exports = (app) => {
    app.use(v1.routes(), v1.allowedMethods())
    app.use(test.routes(), test.allowedMethods())
    app.use(users.routes(), users.allowedMethods())
    app.use(router.routes(), router.allowedMethods())
}

