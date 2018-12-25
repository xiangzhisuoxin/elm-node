let mongoose = require('mongoose');
let cityData = require('../../initData/cities');

const citySchema = new mongoose.Schema({
    data:{}
})

citySchema.statics.cityGuess = async function (name) {
    const firstWord = name.substring(0,1).toUpperCase();
    let info;
    //这样子写为什么会有时候查不到值？
    /*await this.findOne(function (err, res) {
        if (err) {
            console.log('查找数据失败');
            throw '查找数据失败'
        }
        Object.entries(res.data).forEach((item) => {
            if (item[0] == firstWord) {
                item[1].forEach((item) => {
                    if (item.pinyin == name) {
                        info = item;
                    }
                })
            }
        })
    })*/
    const city = await this.findOne();
    Object.entries(city.data).forEach(item => {
        if(item[0] == firstWord){
            item[1].forEach(cityItem => {
                if (cityItem.pinyin == name) {
                    info = cityItem
                }
            })
        }
    })
    if (info) {
        console.log(info);
        return info;
    } else {
        console.log('没有找到该城市');
        throw '没有找到该城市'
    }
};

citySchema.statics.cityHot = async function () {
    let cityHot;
    await this.findOne((err,res) => {
        if (err) {
            throw '查找数据失败'
        }
        if (res) {
            cityHot = res.data.hotCities
        }
    })
    return cityHot
}

citySchema.statics.cityGroup = async function () {
    let res = await this.findOne();
    let cityGroup = res.data;

    delete cityGroup._id;
    delete cityGroup.hotCities

    return cityGroup
}

citySchema.statics.getCityById = async function(id){
    return new Promise(async (resolve, reject) => {
        try{
            const city = await this.findOne();
            Object.entries(city.data).forEach(item => {
                if(item[0] !== '_id' && item[0] !== 'hotCities'){
                    item[1].forEach(cityItem => {
                        if (cityItem.id == id) {
                            resolve(cityItem)
                        }
                    })
                }
            })
        }catch(err){
            reject({
                name: 'ERROR_DATA',
                message: '查找数据失败',
            });
            console.error(err);
        }
    })
    /*const city = await this.findOne();
    Object.entries(city.data).forEach((item) => {
        if (item[0] !== '_id' && item[0] !== 'hotCities') {
            item[1].forEach((cityItem) => {
                if (cityItem.id == id) {
                    return cityItem;
                }
            })
        }
    })*/

}

const Cities = mongoose.model('Cities', citySchema);

Cities.findOne((err, data) => {
    if (!data) {
        Cities.create({
            data: cityData
        })
    }
})

module.exports = Cities