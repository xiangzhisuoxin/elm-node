let City = require('./../controller/v1/cities');
const Food = require('./../controller/v1/food');
const Shop = require('./../controller/v1/shop');
const router = require('koa-router')();
router.prefix('/v1');

//城市列表
router.get('/cities', City.getCities);

//详细地址
router.get('/pois', City.searchDetailPlace);

//食物类别
router.get('/foodType', Food.getFoodType);

//商家列表
router.get('/shopList', Shop.getShopList);
module.exports = router;