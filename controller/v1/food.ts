import baseComponent from '../../prototype/baseComponent';
import FoodTypeModel from '../../model/v1/food-type';
import {RouterContext} from 'koa-router'
class Food extends baseComponent{
    constructor(){
        super();
        this.getFoodType = this.getFoodType.bind(this);

    }
    //获取食物类别 (废弃)
    async getFoodType(ctx:RouterContext){
        try {
            const entries = await FoodTypeModel.find({}, '-_id');
            ctx.body = {
                status: 1,
                msg: '',
                data:entries
            }
        } catch (e) {
            console.log('获取食品分类失败', e);
        }
    }

}

export default new Food();