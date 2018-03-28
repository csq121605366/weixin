/**
 * 前端页面请求返回数据的接口控制
 * 微信相关的控制逻辑
 */
import mongoose from "mongoose";
import { parse as urlParse } from "url";
import { parse as queryParse } from "querystring";
import sha1 from "sha1";
import getRawBody from "raw-body";

// import config from '../config'
import config from "../config";

import WechatLib from "../wechat-lib";
import wechatOAuth from "../wechat-lib/oauth";
import * as util from "../wechat-lib/util";
import reply from "../wechat-lib/reply";

const Token = mongoose.model("Token");
const Ticket = mongoose.model("Ticket");

const wechatConfig = {
  wechat: {
    appID: config.wechat.appID,
    appSecret: config.wechat.appSecrect,
    token: config.wechat.token,
    getAccessToken: async () => await Token.getAccessToken(),
    saveAccessToken: async data => await Token.saveAccessToken(data),
    getTicket: async () => await Ticket.getTicket(),
    saveTicket: async data => await Ticket.saveTicket(data)
  }
};
// 微信基础api封装
export const getWechat = new WechatLib(wechatConfig.wechat);

// 微信oAuth2.0获取用户信息封装
export const getOAuth = new wechatOAuth(wechatConfig.wechat);
// 异步获取签名
async function getSignatureAsync(url) {
  // 获取token
  let data = await getWechat.fetchAccessToken();
  let token = data.access_token;
  // 获取ticket
  let ticketData = await getWechat.fetchTicket(token);
  let ticket = ticketData.ticket;
  // 签名
  let params = getWechat.sign(ticket, url);
  params.appId = getWechat.appID;
  return params;
}
// 获取权限地址
function getAuthorizeURL(...args) {
  let getOAuth = getOAuth();
  return getOAuth.getAuthorizeURL(...args);
}

async function getUserByCode(code) {
  let getOAuth = getOAuth();
  let data = await getOAuth.fetchAccessToken(code);
  let user = await getOAuth.getUserInfo(data.access_token, data.openid);
  return user;
}

// 微信接收消息处理
export async function wechatHear(ctx, next) {
  // 设置微信token
  const { token } = config.wechat;
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
}

export async function signature(ctx, next) {
  let url = ctx.query.url ? decodeURIComponent(ctx.query.url) : ctx.throw(404);
  let params = await getSignatureAsync(url);
  ctx.body = {
    success: true,
    params: params
  };
}

export async function redirect(ctx, next) {
  let target = config.SITE_ROOT_URL + "/oauth";
  let scope = "snsapi_userinfo";
  let { visit, id } = ctx.query;
  let params = `${visit}_${id}`;
  let url = getAuthorizeURL(scope, target, params);
  ctx.redirect(url);
}

export async function oauth(ctx, next) {
  let url = ctx.query.url ? decodeURIComponent(ctx.query.url) : ctx.throw(404);
  let urlObj = urlParse(url);
  let params = queryParse(urlObj.query);
  let code = params.code;
  let user = await getUserByCode(code);
  console.log("url:", url);
  console.log("params:", params);
  console.log("user:", user);
  ctx.body = {
    success: true,
    data: user
  };
}
