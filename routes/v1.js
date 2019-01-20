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

//详细食物类别
router.get('/getShopType', Shop.getShopType);

//商家列表
router.get('/shopList', Shop.getShopList);

//地址信息
router.get('/addressInfo', Shop.getShopList);

//根据关键词搜索商家
router.get('/getShopsByKeyword', Shop.getShopsByKeyword);
module.exports = router;