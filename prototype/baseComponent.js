const ids = require('../model/ids')

module.exports = class baseComponent {
    constructor() {
        this.idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];

    }

    async getId(type){
        if (!this.idList.includes(type)) {
            throw new Error('id类型错误')
        }
        try {
            let idArr = await ids.findOne()
            idArr[type]++;
            await idArr.save()
            return idArr[type]
        } catch (e) {
            console.log('获取数据失败');
            throw new Error(e)
        }
    }
}