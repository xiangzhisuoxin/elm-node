let axios = require('axios')
let baseComponent = require('./baseComponent')

module.exports = class addressComponent extends baseComponent {
    constructor() {
        super();
        this.tencentkey = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
        this.tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X';
        this.tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN';
        this.baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
        this.baidukey2 = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
    }

    //获取定位地址
    async guessPosition(req) {
        return new Promise(async (resolve, reject) => {
            let ip;
            if (process.env.NODE_ENV == 'development') {
                ip = '180.158.102.141';
                // ip = '192.168.0.117';
            } else {
                ip = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    req.connection.socket.remoteAddress;
                const ipArr = ip.split(':');
                ip = ipArr[ipArr.length - 1];
            }

            try {
                let result = await axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
                    params: {
                        ip,
                        key: this.tencentkey,
                    },
                })
                if (result.data.status != 0) {
                    result = await axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
                        params: {
                            ip,
                            key: this.tencentkey,
                        },
                    })
                }
                if (result.data.status != 0) {
                    result = await axios.get('http://apis.map.qq.com/ws/location/v1/ip', {
                        params: {
                            ip,
                            key: this.tencentkey,
                        },
                    })
                }
                if (result.data.status == 0) {
                    const cityInfo = {
                        lat: result.data.result.location.lat,
                        lng: result.data.result.location.lng,
                        city: result.data.result.ad_info.city,
                    }
                    cityInfo.city = cityInfo.city.replace(/市$/, '');
                    resolve(cityInfo)
                } else {
                    console.log('定位失败', result)
                    reject('定位失败');
                }
            } catch (err) {
                reject(err);
            }
        })
    }

    //搜索详细地址
    async searchPlace(keyword, cityName) {
        try {
            const resObj = await axios.get('http://apis.map.qq.com/ws/place/v1/search', {
                params: {
                    key: this.tencentkey,
                    keyword: encodeURIComponent(keyword),
                    boundary: 'region(' + encodeURIComponent(cityName) + ',0)',
                    page_size: 10,
                }
            });
            if (resObj.data.status == 0) {
                return resObj.data
            } else {
                throw new Error('搜索位置信息失败');
            }
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * 获取距离
     * @param from
     * @param to
     * @returns {Promise<void>}
     */
    async getDistance(from, to) {
        try {
            let res;
            res = await axios.get('http://api.map.baidu.com/routematrix/v2/driving', {
                params: {
                    ak: this.baidukey,
                    output: 'json',
                    origins: from,
                    destinations: to,
                }
            });
            if (res.data.status !== 0) {
                res = await axios.get('http://api.map.baidu.com/routematrix/v2/driving', {
                    params: {
                        ak: this.baidukey2,
                        output: 'json',
                        origins: from,
                        destinations: to,
                    }
                })
            }
            if (res.data.status == 0) {
                const positionArr = [];
                let timevalue;
                res.data.result.forEach(item => {
                    timevalue = parseInt(item.duration.value) + 1200;
                    let durationtime = Math.ceil(timevalue % 3600 / 60) + '分钟';
                    if (Math.floor(timevalue / 3600)) {
                        durationtime = Math.floor(timevalue / 3600) + '小时' + durationtime;
                    }
                    positionArr.push({
                        distance: item.distance.text,
                        order_lead_time: durationtime,
                    })
                })
                return positionArr
                /*if (type == 'tiemvalue') {
                    return timevalue
                } else {
                    return positionArr
                }*/
            } else {
                throw new Error('调用百度地图测距失败');
            }
        } catch (err) {
            console.log('获取位置距离失败')
            throw new Error(err);
        }
    }


}