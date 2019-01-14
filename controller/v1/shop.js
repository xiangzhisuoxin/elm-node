const baseComponent = require('../../prototype/baseComponent');
const ShopTypeModel = require('../../model/v1/shop-type');
const ShopModel = require('../../model/v1/shop');

class Shop extends baseComponent{
    constructor(){
        super();
        this.getShopList = this.getShopList.bind(this);
        this.getShopType = this.getShopType.bind(this);
    }
    //获取商家列表
    async getShopList(ctx){
        let {
            latitude,
            longitude,
            offset = 0,
            limit = 20,
            restaurant_category_id,
            order_by,
            delivery_mode = [],
            support_ids = [],
            restaurant_category_ids,
        } = ctx.query;
        restaurant_category_id = Number(restaurant_category_id);
        restaurant_category_ids = Number(restaurant_category_ids);
        let filter = {};

        if(restaurant_category_id) {
            if (restaurant_category_ids && (restaurant_category_ids !== restaurant_category_id)) {
                //返回详细类的
                const [shopType, shopSubType] = await Promise.all([
                    ShopTypeModel.getTypeById(restaurant_category_id),
                    ShopTypeModel.getSubTypeById(restaurant_category_id, restaurant_category_ids)
                ]);
                let category = shopType.name + '/' + shopSubType.name;
                Object.assign(filter,{category})
            } else {
                //返回大类的
                const shopType = await ShopTypeModel.getTypeById(restaurant_category_id);
                Object.assign(filter,{category: {$regex: shopType.name, $options: 'g'}});
            }
        } else {
            //返回最近的
        }

        let sortBy = {};
        if (Number(order_by)) {
            //1：起送价、2：配送速度、3:评分、4: 智能排序(默认)、5:距离最近、6:销量最高
            switch(Number(order_by)){
                case 1:
                    Object.assign(sortBy, {float_minimum_order_amount: 1});
                    break;
                case 2:
                    Object.assign(filter, {location: {$near: [longitude, latitude]}});
                    break;
                case 3:
                    Object.assign(sortBy, {rating: -1});
                    break;
                case 5:
                    Object.assign(filter, {location: {$near: [longitude, latitude]}});
                    break;
                case 6:
                    Object.assign(sortBy, {recent_order_num: -1});
                    break;
            }
        }

        if (Array.isArray(delivery_mode) && delivery_mode.length) {
            Object.assign(filter, {'delivery_mode.id': {$all: delivery_mode}});
        }

        if (Array.isArray(support_ids) && support_ids.length) {
            Object.assign(filter, {'supports.id': {$all: support_ids}});
        }

        const shopList = await ShopModel.find(filter, '-_id').sort(sortBy).limit(Number(limit)).skip(Number(offset));

        ctx.body = {
            status: 1,
            msg: '',
            data:shopList
        }

    }

    /**
     * 获取商家分类
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async getShopType(ctx){
        const detailFoodType = await ShopTypeModel.find({}, '-_id');
        ctx.body = {
            status: 1,
            msg: '',
            data: detailFoodType
        }
    }
}

module.exports = new Shop();