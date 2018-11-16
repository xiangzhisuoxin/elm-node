const router = require('koa-router')()
const User = require('../controller/v2/user');
router.prefix('/v2');

router.post('/login', User.login);


module.exports = router