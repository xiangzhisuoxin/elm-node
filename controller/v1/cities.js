const addressComponent = require('../../prototype/addressComponent')
const pinyin = require('pinyin')
let cityModel = require('../../model/v1/cities')

class City extends addressComponent {
    constructor(){
        super()
        this.getCities = this.getCities.bind(this);
        this.searchDetailPlace = this.searchDetailPlace.bind(this);
    }
    //获取当前城市
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

    //根据请求头获取城市名字
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

    //根据城市id和关键字猜地址
    async searchDetailPlace(ctx) {
        let {cityId,keyword} = ctx.query;
        if(!keyword){
            ctx.body = {
                status: 0,
                msg: '关键词错误'
            }
        }
        if (!cityId) {
            let cityName = await this.getCityName(ctx.req);
            let cityInfo = await cityModel.cityGuess(cityName);
            cityId = cityInfo.id;
        }
        let cityObj = await cityModel.getCityById(cityId);
        let cityRes = await this.searchPlace(keyword, cityObj.name);
        ctx.body = {
            status: 1,
            msg: '',
            data:{
                cityRes
            }
        }

    }
}

module.exports = new City()