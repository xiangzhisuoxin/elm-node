const mongoose = require('mongoose');
const entry = require('../../initData/entry');

const foodSchema = new mongoose.Schema({
    id: Number,
    is_in_serving: Boolean,
    description: String,
    title: String,
    link: String,
    image_url: String,
    icon_url: String,
    title_color: String
})

const FoodType = mongoose.model('Foodtypes',foodSchema);

FoodType.findOne((err,data) => {
    if (!data) {
        entry.forEach((item) => {
            FoodType.create(item)
        })
    }
})

module.exports = FoodType;
