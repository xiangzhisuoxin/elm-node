const mongoose = require('mongoose');
const category = require('../../initData/category');

const foodDetailType = new mongoose.Schema({
    count: Number,
    id: Number,
    ids: [],
    image_url: String,
    level: Number,
    name: String,
    sub_categories: [
        {
            count: Number,
            id: Number,
            image_url: String,
            level: Number,
            name: String
        },
    ]
})

const FoodDetailType = mongoose.model('food_detail_types',foodDetailType);

FoodDetailType.findOne((err,data) => {
    if (!data) {
        category.forEach((item) => {
            FoodDetailType.create(item)
        })
    }
})

module.exports = FoodDetailType;
