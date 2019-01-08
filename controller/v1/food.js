const baseComponent = require('../../prototype/baseComponent');
const FoodTypeModel = require('../../model/v1/food-type');
const FoodDetailTypeModel = require('../../model/v1/food-detail-type');

class Food extends baseComponent{
    constructor(){
        super();
        this.getFoodType = this.getFoodType.bind(this);

    }
    //获取食物类别
    async getFoodType(ctx){
        try {
            const entries = await FoodTypeModel.find({}, '-_id');
            ctx.body = {
                status: 1,
                msg: '',
                data:entries
            }
        } catch (e) {
            console.err('获取食品分类失败', e);
        }
    }

    /**
     * 获取食品分类
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    async getDetailFoodType(ctx){
        const detailFoodType = await FoodDetailTypeModel.find({}, '-_id');
        ctx.body = {
            status: 1,
            msg: '',
            data: detailFoodType
        }
    }
}

module.exports = new Food();