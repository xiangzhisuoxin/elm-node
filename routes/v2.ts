import * as Router from 'koa-router';
import User from '../controller/v2/user';
import Captcha from '../controller/v2/captchas';

const router = new Router();
router.prefix('/v2');

router.post('/login', User.login);
router.post('/captchas', Captcha.getVerificationCode);

export default router;