import * as Koa from 'koa';
import * as json from 'koa-json';
import * as onerror from 'koa-onerror';
import * as bodyparser from 'koa-bodyparser';
import * as logger from "koa-logger";
import * as configLite from 'config-lite';
import * as session from 'koa-session';
import router from './routes/index'
require("./mongodb/db");


const app = new Koa();
const config = configLite(__dirname);

app.keys = ['some secret hurr'];   /*cookie的签名*/

// const router = require('./routes/index')
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
        (ctx.app as any).emit('error', err, ctx);
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

// app.use(views(__dirname + '/views', {
//     extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
    const start:number = Date.now()
    await next()
    const ms:number = Date.now() - start
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

export default app;
