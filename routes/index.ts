import v1 from './v1';
// import v2 from './v2';
// import users from './users';
// import test from './test';
import * as Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  /*await ctx.render('index', {
    title: 'Hello Koa 2!'
  })*/
  ctx.body = 'connected alll'
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
export default (app) => {
    app.use(v1.routes(), v1.allowedMethods())
    // app.use(v2.routes(), v2.allowedMethods())
    // app.use(test.routes(), test.allowedMethods())
    // app.use(users.routes(), users.allowedMethods())
    app.use(router.routes(), router.allowedMethods());
}
/*module.exports = (app) => {
}*/

/*
import * as KoaRouter from 'koa-router'
let router = new KoaRouter();
router.get('/a', (ctx) => {
    ctx.body = 'hello a';
})

*/
