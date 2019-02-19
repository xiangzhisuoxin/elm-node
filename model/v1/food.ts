import {Schema, Model, Document, model} from 'mongoose';
interface IFood extends Document{
    rating?: number,
    is_featured?: number,
    restaurant_id?: number,
    category_id?: number,
    pinyin_name?: string,
    display_times?: Array<any>;
    attrs?: Array<any>,
    description?: string,
    month_sales?: number,
    rating_count?: number,
    tips?: string,
    image_path?: string,
    specifications?: Schema.Types.Mixed;
    server_utc?: object,
    is_essential?: boolean,
    attributes?: Array<any>,
    item_id?: number,
    limitation?: Schema.Types.Mixed,
    name?: string,
    satisfy_count?: number,
    activity?: Schema.Types.Mixed,
    satisfy_rate?: number,
    specfoods?: [{
        original_price?: number,
        sku_id?: number,
        name?: string,
        pinyin_name?: string,
        restaurant_id?: number,
        food_id?: number,
        packing_fee?: number,
        recent_rating?: number,
        promotion_stock?: number,
        price?: number,
        sold_out?: boolean,
        recent_popularity?: number,
        is_essential?: boolean,
        item_id?: number,
        checkout_mode?: number,
        stock?: number,
        specs_name?: string,
        specs?: [
            {
                name?: string,
                value?: string
            }
            ]
    }]
}

interface IMenu extends Document {
    description?: string,
    is_selected?: boolean,
    icon_url?: string,
    name?: string,
    id?:  number,
    restaurant_id?: number,
    type?: number,
    foods?: IFood
}
interface IMFood extends Model<IFood>{
    getHotFoodByShopId?(id:number):Promise<Array<IFood>>;
    getHotFoodByShopIds?(arrId:Array<number>):Promise<Array<IFood>>;
}
const foodSchema = new Schema({
    rating: {type: Number, default: 0},
    is_featured: {type: Number, default: 0},
    restaurant_id: {type: Number, isRequired: true},
    category_id: {type: Number, isRequired: true},
    pinyin_name: {type: String, default: ''},
    display_times: {type: Array, default: []},
    attrs: {type: Array, default: []},
    description: {type: String, default: ""},
    month_sales: {type: Number, default: 0},
    rating_count: {type: Number, default: 0},
    tips: String,
    image_path: String,
    specifications: [Schema.Types.Mixed],
    server_utc: {type: Date, default: Date.now()},
    is_essential: {type: Boolean, default: false},
    attributes: {type: Array, default: []},
    item_id: {type: Number, isRequired: true},
    limitation: Schema.Types.Mixed,
    name: {type: String, isRequired: true},
    satisfy_count: {type: Number, default: 0},
    activity: Schema.Types.Mixed,
    satisfy_rate: {type: Number, default: 0},
    specfoods: [{
        original_price: {type: Number, default: 0},
        sku_id: {type: Number, isRequired: true},
        name: {type: String, isRequired: true},
        pinyin_name: {type: String, default: ""},
        restaurant_id: {type: Number, isRequired: true},
        food_id: {type: Number, isRequired: true},
        packing_fee: {type: Number, default: 0},
        recent_rating: {type: Number, default: 0},
        promotion_stock: {type: Number, default: -1},
        price: {type: Number, default: 0},
        sold_out: {type: Boolean, default: false},
        recent_popularity: {type: Number, default: 0},
        is_essential: {type: Boolean, default: false},
        item_id: {type: Number, isRequired: true},
        checkout_mode: {type: Number, default: 1},
        stock: {type: Number, default: 1000},
        specs_name: String,
        specs: [
            {
                name: String,
                value: String
            }
        ]
    }]
});
const menuSchema = new Schema({
    description: String,
    is_selected: {type: Boolean, default: true},
    icon_url: {type: String, default: ''},
    name: {type: String, isRequired: true},
    id:  {type: Number, isRequired: true},
    restaurant_id: {type: Number, isRequired: true},
    type: {type: Number, default: 1},
    foods: [foodSchema]
});

foodSchema.index({item_id: 1});
menuSchema.index({id: 1});

foodSchema.statics.getHotFoodByShopId = async function (id:number):Promise<Array<IFood>> {
    let food = await this.find({restaurant_id: id,satisfy_rate:{$gte:80}}, '-_id');
    return food;
};

foodSchema.statics.getHotFoodByShopIds = async function (arrId:Array<number>):Promise<Array<IFood>> {
    let food = await this.find({restaurant_id: {$in: arrId},satisfy_rate:{$gte:80}}, {
        name: 1,
        rating :1,
        restaurant_id : 1,
        month_sales: 1,
        specfoods: 1,
        _id: 0
    });
    return food;
};

const Food:IMFood = model<IFood>('Food', foodSchema);
const Menu = model<IMenu>('Menu', menuSchema);

// module.exports = {Food,Menu};
export default Food;