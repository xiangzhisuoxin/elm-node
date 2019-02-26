import addressComponent from '../../prototype/addressComponent';
import ShopTypeModel from '../../model/v1/shop-type';
import ShopModel from '../../model/v1/shop';
import {FoodModel} from '../../model/v1/food';
import { RouterContext } from 'koa-router';

class Shop extends addressComponent{
    constructor(){
        super();
        this.getShopList = this.getShopList.bind(this);
        this.getShopType = this.getShopType.bind(this);
        this.getShopsByKeyword = this.getShopsByKeyword.bind(this);
        this.addDistanceInfo = this.addDistanceInfo.bind(this);
    }
    //获取商家列表
    getShopList = async (ctx) => {
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

        let shopList = await ShopModel.find(filter, '-_id').sort(sortBy).limit(Number(limit)).skip(Number(offset));

        //获得商家距离
        shopList = await this.addDistanceInfo(shopList,latitude,longitude);
        ctx.body = {
            status: 1,
            msg: '',
            data:shopList
        };

    }

    /**
     * 获取商家分类
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    getShopType = async (ctx)=>{
        const detailFoodType = await ShopTypeModel.find({}, '-_id');
        ctx.body = {
            status: 1,
            msg: '',
            data: detailFoodType
        }
    }

    /**
     * 根据关键词搜索商家
     * @param ctx 上下文
     * @returns {Promise<void>}
     */
    getShopsByKeyword=async (ctx) =>{
        let {
            latitude,
            longitude,
            offset = 0,
            limit = 20,
            keyword
        } = ctx.query;
        if (!keyword) {
            ctx.body = {
                status: 0,
                msg: '关键词错误'
            }
        }
        let filter = {
            'name':{$regex: keyword, $options: 'g'},
            'location': {$near: [longitude, latitude]},
        }
        let arrResult = await ShopModel.find(filter, '-_id').limit(Number(limit)).skip(Number(offset));
        arrResult = await this.addDistanceInfo(arrResult,latitude,longitude);

        let arrId  = arrResult.map((item) => {
            return item.id;
        });

        let arrFood = await FoodModel.getHotFoodByShopIds(arrId);
        arrResult.map((item) => {
            let hotFood = [];
            arrFood.map((item2) => {
                if (item2.restaurant_id == item.id) {
                    hotFood.push(item2)
                }
            })
            return Object.assign(item, {hotFood: [...hotFood]})
            // item.hotFood = hotFood;
        })

        /*arrResult.map((item, index) => {
            return Object.assign(item, {ind: index})
        });*/

        /*for (let i = 0; i < arrResult.length; i++) {
            let hotFood = [];
            for (let j = 0; j < arrFood.length; j++) {
                let item2 = arrFood[j];
                if (item2.restaurant_id == arrResult[i].id) {
                    hotFood.push(item2)
                }
            }
            arrResult[i].hotFood = hotFood;
        }*/

        ctx.body = {
            status: 1,
            msg: '',
            data: arrResult
        }
    
    
    }
    /**
     * 根据商家id获取商家信息
     * @param ctx 
     */
    getShopById = async (ctx:RouterContext) => {
        let {
            resId,
            latitude,
            longitude,
        } = ctx.query;
        let result = await ShopModel.findOne({id:resId});
        let resArr = [result]
        let data = await this.addDistanceInfo(resArr,latitude,longitude)
        if(result){
            ctx.body={
                status:1,
                msg:'',
                data:data
            }
        }
    }

    /**
     * 调用百度api 给查询结果增加距离信息
     * @param shopList {Array} 查询结果
     * @returns {Promise<*>}
     */
    addDistanceInfo = async (shopList: Array<any>,latitude:number,longitude:number): Promise<any> =>{
        if (shopList.length) {
            let from = `${latitude},${longitude}`;
            let to = '';
            shopList.forEach((item, index) => {
                let splitStr = index == shopList.length - 1 ? '' : '|';
                to += `${item.latitude},${item.longitude}${splitStr}`;
            });

            let res = await this.getDistance(from, to);
            shopList.map((item,index) => {
                return Object.assign(item, res[index])
            })
        }
        return shopList;
    }


}

export default new Shop();