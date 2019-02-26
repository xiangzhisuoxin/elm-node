import baseComponent from '../../prototype/baseComponent';
import FoodTypeModel from '../../model/v1/food-type';
import {RouterContext} from 'koa-router'
import { MenuModel } from '../../model/v1/food';
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

    /**
     * 根据商家id获取商家食品列表
     *
     * @memberof Shop
     */
    getMenuByShopId = async (ctx:RouterContext) => {
        let {resId} = ctx.query;
        let res = await MenuModel.getMenuByShopId(+resId);
        return ctx.body={
            status:1,
            msg:'',
            data:res
        }
    }

}

export default new Food();