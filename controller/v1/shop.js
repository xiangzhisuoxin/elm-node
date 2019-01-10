const baseComponent = require('../../prototype/baseComponent');
const ShopTypeModel = require('../../model/v1/shop-type');

class Shop extends baseComponent{
    constructor(){
        super();
        this.getShopList = this.getShopList.bind(this);
        this.getShopType = this.getShopType.bind(this);
    }
    //获取商家列表
    async getShopList(ctx){
        const {
            latitude,
            longitude,
            offset = 0,
            limit = 20,
            restaurant_category_id,
            order_by,
            delivery_mode = [],
            support_ids = [],
            restaurant_category_ids = [],
        } = ctx.query;
        let filter = {};

        if(restaurant_category_id) {
            if (restaurant_category_ids) {
                //返回详细类的
            } else {
                //返回大类的
            }
        } else {
            //返回最近的
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