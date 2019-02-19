import * as mongoose from 'mongoose';
interface IIds extends mongoose.Document{
    restaurant_id: number,
    food_id: number,
    order_id: number,
    user_id: number,
    address_id: number,
    cart_id: number,
    img_id: number,
    category_id: number,
    item_id: number,
    sku_id: number,
    admin_id: number,
    statis_id: number,
}

const idsSchema = new mongoose.Schema({
    restaurant_id: Number,
    food_id: Number,
    order_id: Number,
    user_id: Number,
    address_id: Number,
    cart_id: Number,
    img_id: Number,
    category_id: Number,
    item_id: Number,
    sku_id: Number,
    admin_id: Number,
    statis_id: Number,
})

const ids = mongoose.model<IIds>('ids', idsSchema);

ids.findOne((err, data) => {
    if (!data) {
        const newId = {
            restaurant_id: 0,
            food_id: 0,
            order_id: 0,
            user_id: 0,
            address_id: 0,
            cart_id: 0,
            img_id: 0,
            category_id: 0,
            item_id: 0,
            sku_id: 0,
            admin_id: 0,
            statis_id: 0,
        }
        ids.create(newId)
    }
})

export default ids;