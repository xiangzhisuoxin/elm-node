const router = require('koa-router')()
const User = require('../controller/v2/user');
const Captchas = require('../controller/v2/captchas');
router.prefix('/v2');

router.post('/login', User.login);
router.post('/captchas', Captchas.getVerificationCode);


module.exports = router