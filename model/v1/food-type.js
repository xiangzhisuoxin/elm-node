const mongoose = require('mongoose');
const entry = require('../../initData/entry');

const foodSchema = mongoose.Schema({
    id: Number,
    is_in_serving: Boolean,
    description: String,
    title: String,
    link: String,
    image_url: String,
    icon_url: String,
    title_color: String
})

const FoodType = new mongoose.model('FoodType',foodSchema)

FoodType.findOne((err,data) => {
    if (!data) {
        entry.forEach((item) => {
            FoodType.create({
                data:item
            })
        })
    }
})

module.exports = FoodType;
