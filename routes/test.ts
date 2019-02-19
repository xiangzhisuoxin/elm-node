import * as Router from 'koa-router';

const router = new Router();
router.prefix('/test');

router.get('/', async (ctx, next) => {
    //get请求参数获取
    let url = ctx.url;
    // 从上下文的request对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;

    // 从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;

    ctx.body = {
        url,
        req_query,
        req_querystring,
        ctx_query,
        ctx_querystring,
        ctx
    }
});

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string test /string'
});

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json text /json'
    }
});

router.get('/cookies', async (ctx, next) => {
    ctx.cookies.set(
        'cid',
        'hello world',
        {
            domain: 'localhost',  // 写cookie所在的域名
            path: ctx.url,       // 写cookie所在的路径
            // maxAge: 10 * 60 * 1000, // cookie有效时长
            // expires: new Date('2017-02-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
        }
    );
    ctx.body = 'cookie is ok'
});

export default router;