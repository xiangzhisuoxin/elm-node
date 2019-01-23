const baseComponent = require('../../prototype/baseComponent');
const FoodTypeModel = require('../../model/v1/food-type');

class Food extends baseComponent{
    constructor(){
        super();
        this.getFoodType = this.getFoodType.bind(this);

    }
    //获取食物类别 (废弃)
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

}

module.exports = new Food();