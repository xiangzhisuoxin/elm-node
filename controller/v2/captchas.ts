import addressComponent from '../../prototype/addressComponent';
import * as captchapng from 'captchapng';

class captchas extends addressComponent{
    constructor(){
        super();
    }
    //获取验证码
    async getVerificationCode(ctx) {
        const cap = Math.ceil(Math.random()*9000+1000);
        const p = new captchapng(80,30, cap);
        p.color(0, 0, 0, 0);
        p.color(80, 80, 80, 255);
        const base64 = p.getBase64();
        ctx.cookies.set('cap', cap, {
            maxAge: 300000,
            httpOnly: true
        });
        ctx.body = {
            status:1,
            code: 'data:image/png;base64,' + base64
        };
    }
}

export default new captchas();