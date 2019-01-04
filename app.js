const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger');
const config = require('config-lite');
const session = require('koa-session')

let db = require('./mongodb/db')

app.keys = ['some secret hurr'];   /*cookie的签名*/

const router = require('./routes/index')
// import index from './routes/index'
// const users = require('./routes/users')

// error handler
onerror(app)
//统计处理错误
app.use(async (ctx,next) => {
    try{
        await next();
    }catch(err){
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            msg: err.message,
            status: 0,
            url:ctx.url
        };
        // 手动释放error事件 否则error事件不会触发
        ctx.app.emit('error', err, ctx);
    }
});

//session配置
app.use(session(config.session, app));

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
router(app)

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
