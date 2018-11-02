let mongoose = require('mongoose');
let cityData = require('../../initData/cities');

const citySchema = new mongoose.Schema({
    data:{}
})

citySchema.statics.cityGuess = function (name) {

};


const Cities = mongoose.model('Cities', citySchema);

Cities.findOne((err, data) => {
    if (!data) {
        Cities.create({
            data: cityData
        })
    }
})

module.exports = Cities