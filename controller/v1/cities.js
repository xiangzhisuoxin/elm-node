const addressComponent = require('../../prototype/addressComponent')
const pinyin = require('pinyin')
let cityModel = require('../../model/v1/cities')

class City extends addressComponent {
    constructor(){
        super()
        this.getCities = this.getCities.bind(this);
    }

    async getCities(ctx) {
        let type = ctx.query.type,
            cityInfo,
            city;
        try {
            switch (type) {
                case "guess" :
                    city = await this.getCityName(ctx.request);
                    cityInfo = await cityModel.cityGuess(city);
                    break;
                case "cityHot" :
                    cityInfo = await cityModel.cityHot();
                    break;
                case "cityGroup":
                    cityInfo = await cityModel.cityGroup();
                    break;
            }
            ctx.body = cityInfo;
            return
        } catch (e) {
            ctx.body = cityInfo;

        }
        // ctx.body = type
        // ctx.body = ctx.url +'connected';
    }

    async getCityName(req){
        let cityInfo;

        try {
            cityInfo = await this.guessPosition(req)
        } catch (e) {
            console.error('获取IP位置信息失败', e)
        }
        /*
        汉字转换成拼音
         */
        const pinyinArr = pinyin(cityInfo.city, {
            style: pinyin.STYLE_NORMAL,
        });
        let cityName = '';
        pinyinArr.forEach(item => {
            cityName += item[0];
        })
        return cityName;
    }
}

module.exports = new City()