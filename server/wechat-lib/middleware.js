import sha1 from 'sha1';
import getRawBody from 'raw-body';
import * as util from './util';
import reply from '../wechat/reply';


export default function(opts, reply) {
    return async function wechatMiddle(ctx, next) {
        // 设置微信token
        const { token } = opts;
        const {
            signature,
            nonce,
            timestamp,
            echostr
        } = ctx.query;
        let str = [token, timestamp, nonce].sort().join('');
        let sha = sha1(str);
        if (ctx.method === 'GET') {
            if (sha === signature) {
                ctx.body = echostr;
            } else {
                ctx.body = 'Failed';
            }
        } else if (ctx.method === 'POST') {
            if (sha !== signature) {
                ctx.body = 'Faild';
                return false;
            }
            let data = await getRawBody(ctx.req, {
                length: ctx.length,
                limit: '1mb',
                encoding: ctx.charset
            })
            let content = await util.parseXML(data);
            let message = util.formatMessage(content.xml);
            // 将微信内容挂在ctx上
            ctx.weixin = message;
            await reply.apply(ctx, [ctx, next]);
            let replyBody = ctx.body;
            let msg = ctx.weixin;
            console.log(replyBody)
            let xml = util.template(replyBody, msg);
            console.log(xml);
            ctx.status = 200;
            ctx.type = 'application/xml';
            ctx.body = xml;
        }
    }
}