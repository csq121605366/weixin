import sha1 from "sha1";
import getRawBody from "raw-body";
import * as util from "./util";
import reply from '../wechat/reply';

export default function(opts) {
  return async function wechatMiddle(ctx, next) {
    // 设置微信token
    const { token } = opts;
    const { signature, nonce, timestamp, echostr } = ctx.query;
    let str = [token, timestamp, nonce].sort().join("");
    let sha = sha1(str);
    // 首先验证请求类型
    if (ctx.method === "GET") {
      if (sha === signature) {
        ctx.body = echostr;
      } else {
        ctx.body = "Failed";
      }
    } else if (ctx.method === "POST") {
      if (sha !== signature) {
        ctx.body = "Faild";
        return false;
      }
      // 解析请求参数1
      let data = await getRawBody(ctx.req, {
        length: ctx.length,
        limit: "1mb",
        encoding: ctx.charset
      });
      // 解析xml
      let content = await util.parseXML(data);
      // 格式化信息
      let message = util.formatMessage(content.xml);
      // 将微信内容挂在ctx上
      ctx.weixin = message;
      // 根据信息制定回复策略
      await reply.apply(ctx, [ctx, next]);
      // 返回信息
      let replyBody = ctx.body;
      let msg = ctx.weixin;
      // 将消息封装在xml中
      let xml = util.template(replyBody, msg);
      ctx.status = 200;
      ctx.type = "application/xml";
      ctx.body = xml;
      // 返回给微信服务器
    }
  };
}
