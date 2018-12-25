let City = require('./../controller/v1/cities');
const Captchas = require('./../controller/v1/captchas');
const router = require('koa-router')();
router.prefix('/v1');

router.get('/cities', City.getCities);
router.post('/captchas', Captchas.getVerificationCode);
router.get('/pois', City.searchDetailPlace);

module.exports = router;