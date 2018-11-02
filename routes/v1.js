let City = require('./../controller/v1/cities')
const router = require('koa-router')()
router.prefix('/v1');

router.get('/cities', City.getCities)

module.exports = router