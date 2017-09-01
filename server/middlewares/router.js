import Router from 'koa-router';
import wechatMiddle from '../wechat-lib/middleware';
import config from '../config';
import reply from '../wechat/reply';
import path from 'path';
import { signature } from '../controllers/wechat';

export const router = app => {
    const router = new Router();
    router.all('/wechat-hear', wechatMiddle(config.wechat, reply));

    router.get('/wechat-signature', signature);

    app
        .use(router.routes())
        .use(router.allowedMethods());
}