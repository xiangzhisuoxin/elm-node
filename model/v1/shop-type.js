const mongoose = require('mongoose');
const category = require('../../initData/category');

const shopTypeSchema = new mongoose.Schema({
    count: Number,
    id: Number,
    ids: [],
    image_url: String,
    level: Number,
    name: String,
    sub_categories: [
        {
            count: Number,
            id: Number,
            image_url: String,
            level: Number,
            name: String
        },
    ]
});

/**
 * 根据商品id获取商品类别（总）
 * @param id {Number} 商品id
 * @returns {Promise<*>}
 */
shopTypeSchema.statics.getTypeById = async function (id) {
    const type = await this.findOne({id});
    return type;
};

/**
 * 根据商品id获取商品类别（详细）
 * @param id {Number} 商品id（总）
 * @param subId {Number} 商品id（详细）
 * @returns {Promise<*>}
 */
shopTypeSchema.statics.getSubTypeById = async function (id,subId) {
    const subType = await this.findOne({id,'sub_categories.id':subId},{sub_categories:1});
    let subItem;
    return subType.sub_categories;
};

const shopType = mongoose.model('shop_types',shopTypeSchema);

shopType.findOne((err,data) => {
    if (!data) {
        category.forEach((item) => {
            shopType.create(item)
        })
    }
});

module.exports = shopType;
