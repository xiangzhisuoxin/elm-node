import * as mongoose from 'mongoose';

interface IShop extends mongoose.Document{
    activities: [{
        description: string,
        icon_color: string,
        icon_name: string,
        id: number,
        name: string,
    }],
    address: string,
    delivery_mode: {
        color: string,
        id: number,
        is_solid: boolean,
        text: string
    },
    description: string,
    order_lead_time: string,
    distance: string,
    hotFood: Array<any>,
    location:Array<number>,
    float_delivery_fee: number,
    float_minimum_order_amount: number,
    id: number,
    category: string,
    identification: {
        company_name: string,
        identificate_agency: string,
        identificate_date: Date,
        legal_person: string,
        licenses_date: string,
        licenses_number: string,
        licenses_scope: string,
        operation_period: string,
        registered_address: string,
        registered_number: string,
    },
    image_path: string,
    is_premium: boolean,
    is_new: boolean,
    latitude: number,
    longitude: number,
    license: {
        business_license_image: string,
        catering_service_license_image: string,
    },
    name: string,
    opening_hours: Array<any>,
    phone: string,
    piecewise_agent_fee: string,
    promotion_info: string,
    rating: never,
    rating_count: number,
    recent_order_num: number,
    status: number,
    supports: [{
        description: string,
        icon_color: string,
        icon_name: string,
        id: number,
        name: string
    }],
}
const shopSchema = new mongoose.Schema({
    activities: [{
        description: String,
        icon_color: String,
        icon_name: String,
        id: Number,
        name: String,
    }],
    address: String,
    delivery_mode: {
        color: String,
        id: Number,
        is_solid: Boolean,
        text: String
    },
    description: { type: String, default: "" },
    order_lead_time: { type: String, default: "" },
    distance: { type: String, default: "" },
    hotFood: {type: Array, default: []},
    location:{type:[Number],index: '2d'},
    float_delivery_fee: { type: Number, default: 0 },
    float_minimum_order_amount: { type: Number, default: 0 },
    id: Number,
    category: String,
    identification: {
        company_name: { type: String, default: "" },
        identificate_agency: { type: String, default: "" },
        identificate_date: { type: Date, default: Date.now },
        legal_person: { type: String, default: "" },
        licenses_date: { type: String, default: "" },
        licenses_number: { type: String, default: "" },
        licenses_scope: { type: String, default: "" },
        operation_period: { type: String, default: "" },
        registered_address: { type: String, default: "" },
        registered_number: { type: String, default: "" },
    },
    image_path: { type: String, default: "" },
    is_premium: { type: Boolean, default: false },
    is_new: { type: Boolean, default: false },
    latitude: Number,
    longitude: Number,
    license: {
        business_license_image: { type: String, default: "" },
        catering_service_license_image: { type: String, default: "" },
    },
    name: {
        type: String,
        required: true
    },
    opening_hours: { type: Array, default: ["08:30/20:30"] },
    phone: {
        type: String,
        required: true
    },
    piecewise_agent_fee: {
        tips: String
    },
    promotion_info: { type: String, default: "欢迎光临，用餐高峰请提前下单，谢谢" },
    rating: { type: Number, default: 0 },
    rating_count: { type: Number, default: 0 },
    recent_order_num: { type: Number, default: 0 },
    status: { type: Number, default: 0 },
    supports: [{
        description: String,
        icon_color: String,
        icon_name: String,
        id: Number,
        name: String
    }],
});

shopSchema.index({ id: 1 }); //primary_key 主键

const Shop = mongoose.model<IShop>('Shop', shopSchema);

export default Shop;