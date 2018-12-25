const crypto = require('crypto');
const dtime = require('time-formater');

const addressComponent = require('../../prototype/addressComponent');
const userModel = require('./../../model/v2/user');
const userInfoModel = require('../../model/v2/userinfo');

class User extends addressComponent{
    constructor(){
        super();
        this.login = this.login.bind(this);
        this.encryption = this.encryption.bind(this);
        this.accounLogin = this.accounLogin.bind(this);
    }

    async login(ctx) {
        //根据参数的type值调用不同的接口
        try {
            let params = ctx.request.body,
                cap = ctx.cookies.get('cap');

            //验证验证码
            if (!cap) {
                ctx.body = {
                    status: 0,
                    msg: '验证码呢'
                };
                return;
            }
            const {captchaCode} = params;

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

    async accounLogin(ctx){
        let params = ctx.request.body;
        const {username, password} = params;
        if (!username || !password ) {
            ctx.body = {
                status: 0,
                msg: '参数错误'
            };
            return;
        }


        let user = await userModel.findOne({username}),
            newPwd = this.encryption(password);
        if (!user) {
            //用户不存在 创建用户
            const user_id = await this.getId('user_id');
            const registe_time = dtime().format('yyyy-MM-dd hh:mm');
            const cityInfo = await this.guessPosition(ctx.req);

            const newUserInfo = {username, user_id, id: user_id, city: cityInfo.city, registe_time};
            const newUser = {username, password: newPwd, user_id};

            const {_user,_userInfo} = await Promise.all([
                userModel.create(newUser),
                userInfoModel.create(newUserInfo)
            ]);

            ctx.session.user_id = user_id;

            ctx.body = {
                status: 1,
                msg: '登录成功',
                data:{
                    userInfo: newUserInfo
                }
            };
            return;
        } else if(user.password.toString() != newPwd.toString()){
            //密码不正确
            ctx.body = {
                status: 3,
                msg: '密码错误'
            };
            return;
        } else {
            //登录成功
            const userInfo = await userInfoModel.findOne({username:user.username});
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
    encryption(password){
        let newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
        return newpassword
    }
    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}


module.exports = new User();
