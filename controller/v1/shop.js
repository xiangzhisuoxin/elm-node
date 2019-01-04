const baseComponent = require('../../prototype/baseComponent');

class Shop extends baseComponent{
    constructor(){
        super();
    }
    //获取食物类别
    async getShopList(ctx){
        const {
            latitude,
            longitude,
            offset = 0,
            limit = 20,
            keyword,
            restaurant_category_id,
            order_by,
            extras,
            delivery_mode = [],
            support_ids = [],
            restaurant_category_ids = [],
        } = req.query;
    }
}

module.exports = new Shop();