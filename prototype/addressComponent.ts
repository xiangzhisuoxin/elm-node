import axios from 'axios';
import baseComponent from './baseComponent';
interface IGuseePosition {
  lat: string;
  lng: string;
  city: string;
}
export default class addressComponent extends baseComponent {
  tencentkey: string;
  tencentkey2: string;
  tencentkey3: string;
  baidukey: string;
  baidukey2: string;

  constructor() {
    super();
    this.tencentkey2 = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
    this.tencentkey = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X';
    this.tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN';
    this.baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
    this.baidukey2 = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
  }

  //获取定位地址
  async guessPosition(req) {
    return new Promise < IGuseePosition > (async (resolve, reject) => {
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
          // reject('定位失败');
          resolve({
            lat: "1",
            lng: "1",
            city: '北京'
          })
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
        let res = {
          "status": 0,
          "message": "query ok",
          "count": 2230,
          "request_id": "1231961290944c9cafb718d833431eff1b1f9913e752",
          "data": [{
            "id": "16780388153993880116",
            "title": "壹健身(珠江店)",
            "address": "北京市朝阳区建国路18号(珠江绿洲家园内)",
            "tel": "010-53687535",
            "category": "运动健身:健身中心",
            "type": 0,
            "location": {
              "lat": 39.90783,
              "lng": 116.55921
            },
            "ad_info": {
              "adcode": 110105,
              "province": "北京市",
              "city": "北京市",
              "district": "朝阳区"
            }
          }, {
            "id": "13402421356057791270",
            "title": "一瓶小区",
            "address": "北京市西城区陶然亭路2号",
            "tel": " ",
            "category": "房产小区:住宅区:住宅小区",
            "type": 0,
            "location": {
              "lat": 39.877748,
              "lng": 116.384291
            },
            "ad_info": {
              "adcode": 110102,
              "province": "北京市",
              "city": "北京市",
              "district": "西城区"
            }
          }, {
            "id": "15323563234474085182",
            "title": "翠林一里",
            "address": "北京市丰台区翠林一里14",
            "tel": " ",
            "category": "房产小区:住宅区:住宅小区",
            "type": 0,
            "location": {
              "lat": 39.86103,
              "lng": 116.3699
            },
            "ad_info": {
              "adcode": 110106,
              "province": "北京市",
              "city": "北京市",
              "district": "丰台区"
            }
          }, {
            "id": "13882221667345310250",
            "title": "一号地国际艺术区",
            "address": "北京市朝阳区顺白路",
            "tel": " ",
            "category": "文化场馆:美术馆",
            "type": 0,
            "location": {
              "lat": 40.043051,
              "lng": 116.493979
            },
            "ad_info": {
              "adcode": 110105,
              "province": "北京市",
              "city": "北京市",
              "district": "朝阳区"
            }
          }, {
            "id": "12683723160740936235",
            "title": "华源一里",
            "address": "北京市丰台区太平桥路与太平桥西路交叉口西南侧",
            "tel": " ",
            "category": "房产小区:住宅区:住宅小区",
            "type": 0,
            "location": {
              "lat": 39.879882,
              "lng": 116.315894
            },
            "ad_info": {
              "adcode": 110106,
              "province": "北京市",
              "city": "北京市",
              "district": "丰台区"
            }
          }, {
            "id": "7078327179995718347",
            "title": "壹健身首府游泳健身会所",
            "address": "北京市朝阳区西大望路甲20号复地首府北门",
            "tel": "15811253205",
            "category": "运动健身:健身中心",
            "type": 0,
            "location": {
              "lat": 39.89679,
              "lng": 116.48027
            },
            "ad_info": {
              "adcode": 110105,
              "province": "北京市",
              "city": "北京市",
              "district": "朝阳区"
            }
          }, {
            "id": "2813049521593317595",
            "title": "壹健身(名商店)",
            "address": "北京市海淀区苏州街55号名商大厦地下1层",
            "tel": "010-62569262",
            "category": "运动健身:健身中心",
            "type": 0,
            "location": {
              "lat": 39.971855,
              "lng": 116.30621
            },
            "ad_info": {
              "adcode": 110108,
              "province": "北京市",
              "city": "北京市",
              "district": "海淀区"
            }
          }, {
            "id": "11590318504269772215",
            "title": "老诚一锅炖羊专家(双榆树店)",
            "address": "北京市海淀区双榆树北里甲18号",
            "tel": "010-62553200",
            "category": "美食:火锅",
            "type": 0,
            "location": {
              "lat": 39.971448,
              "lng": 116.32391
            },
            "ad_info": {
              "adcode": 110108,
              "province": "北京市",
              "city": "北京市",
              "district": "海淀区"
            }
          }, {
            "id": "11260717511060739231",
            "title": "东1时区",
            "address": "北京市朝阳区双桥东路12号院",
            "tel": " ",
            "category": "房产小区:住宅区:住宅小区",
            "type": 0,
            "location": {
              "lat": 39.899309,
              "lng": 116.606498
            },
            "ad_info": {
              "adcode": 110105,
              "province": "北京市",
              "city": "北京市",
              "district": "朝阳区"
            }
          }, {
            "id": "11861270202470335167",
            "title": "壹线国际",
            "address": "北京市朝阳区建国路(地铁一号线四惠站)",
            "tel": " ",
            "category": "房产小区:住宅区:住宅小区",
            "type": 0,
            "location": {
              "lat": 39.90874,
              "lng": 116.50386
            },
            "ad_info": {
              "adcode": 110105,
              "province": "北京市",
              "city": "北京市",
              "district": "朝阳区"
            }
          }],
          "region": {
            "title": "北京市"
          }
        }
        return res;
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