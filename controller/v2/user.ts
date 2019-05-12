import addressComponent from '../../prototype/addressComponent';
import * as crypto from 'crypto';
// import * as dtime from 'time-formater';
import userModel from './../../model/v2/user';
import userInfoModel from '../../model/v2/userinfo';

class User extends addressComponent {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.encryption = this.encryption.bind(this);
        this.accounLogin = this.accounLogin.bind(this);
    }

    async login(ctx) {
        //根据参数的type值调用不同的接口
        try {
            let params = ctx.request.body;
            let cap = ctx.cookies.get('cap');
            // let cap = params.captchaCode;

            //验证验证码
            if (!cap) {
                ctx.body = {
                    status: 0,
                    msg: '验证码呢'
                };
                return;
            }
            const {
                captchaCode
            } = params;

            if (captchaCode.toString() != cap.toString()) {
                ctx.body = {
                    status: 2,
                    msg: '验证码再看看'
                };
                return;
            }

            switch (params.type) {
                case 'account':
                    await this.accounLogin(ctx);
                    return;
                    break;
            }
        } catch (e) {
            console.error('登录失败', e);
        }
    }

    async accounLogin(ctx) {
        let params = ctx.request.body;
        const {
            username,
            password
        } = params;
        if (!username || !password) {
            ctx.body = {
                status: 0,
                msg: '参数错误'
            };
            return;
        }


        let user = await userModel.findOne({
            username
        });
        let newPwd = this.encryption(password);
        if (!user) {
            //用户不存在 创建用户
            const user_id = await this.getId('user_id');

            (Date as any).prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }

            let registe_time = (new Date() as any).Format('yyyy-MM-dd hh:mm:ss');
            const cityInfo = await this.guessPosition(ctx.req);

            const newUserInfo = {
                username,
                user_id:-1,
                id: -1,
                city: cityInfo.city,
                registe_time
            };
            const newUser = {
                username,
                password: newPwd,
                user_id:-1
            };

            await Promise.all([
                userModel.create(newUser),
                userInfoModel.create(newUserInfo)
            ]);

            ctx.session.user_id = user_id;

            ctx.body = {
                status: 1,
                msg: '登录成功',
                data: {
                    userInfo: newUserInfo
                }
            };
            return;
        } else if (user.password.toString() != newPwd.toString()) {
            //密码不正确
            ctx.body = {
                status: 3,
                msg: '密码错误'
            };
            return;
        } else {
            //登录成功
            const userInfo = await userInfoModel.findOne({
                username: user.username
            });
            ctx.session.user_id = user.user_id;
            ctx.body = {
                status: 1,
                msg: '登录成功',
                data: {
                    userInfo
                }
            };
            return;
        }
    }

    //加密密码
    encryption(password) {
        let newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }

    Md5(password) {
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}


export default new User();