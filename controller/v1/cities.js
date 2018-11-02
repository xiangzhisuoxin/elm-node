const addressComponent = require('../../prototype/addressComponent')
let cityModel = require('../../model/v1/cities')
class City extends addressComponent {
    constructor(){
        super()
        this.getCities = this.getCities.bind(this);
    }

    async getCities(ctx) {
        let type = ctx.query.type,
            city;
        try {
            switch (type) {
                case "guess" :
                    city = await this.getCityName(ctx.request);
                    // cityInfo =
                    break;
            }
            ctx.body = city;
        } catch (e) {

        }
        // ctx.body = type
        ctx.body = ctx.url +'connected';
    }

    async getCityName(req){
        let cityInfo;

        try {
            cityInfo = await this.guessPosition(req)
        } catch (e) {
            console.error('获取IP位置信息失败', e)

        }
        return cityInfo;
    }
}

let getCities = async (ctx, next) => {
    let type = ctx.request.body.type || 'no type'
    // ctx.body = type

    ctx.body = 'connected'
}

// module.exports = getCities
module.exports = new City()