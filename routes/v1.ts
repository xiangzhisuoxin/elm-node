import * as Router from 'koa-router';
import City from './../controller/v1/cities';
import Food from './../controller/v1/food';
import Shop from './../controller/v1/shop';
import Rating from './../controller/v1/rating';

const router = new Router();
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

// 根据商家id返回商家信息
router.get('/getShopById', Shop.getShopById);

// 根据商家id获取商家食品列表
router.get('/getMenuByShopId', Food.getMenuByShopId);

// 根据商家id返回评论
router.get('/getRatingByShopId', Rating.getRatingByShopId)

export default router;