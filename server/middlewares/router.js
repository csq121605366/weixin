import Router from "koa-router";
import wechatMiddle from "../wechat-lib/middleware";
import config from "../config";
import reply from "../wechat/reply";
import { signature, redirect, oauth } from "../controllers/wechat";

export const router = app => {
  const router = new Router();
  router.all("/wechat-hear", wechatMiddle(config.wechat, reply));

  router.get("/wechat-signature", signature);

  router.get("/wechat-redirect", redirect);

  router.get("/wechat-oauth", oauth);

  // allowedMethods 当请求出错时的处理逻辑
  // 那这个函数其实就是当所有中间件函数执行完了，并且请求出错了进行相应的处理：
  // 如果请求的方法koa-router不支持并且没有设置throw选项，则返回 501(未实现)
  // 如果是options请求，则返回 204(无内容)
  // 如果请求的方法支持但没有设置throw选项，则返回 405(不允许此方法 )
  app.use(router.routes()).use(router.allowedMethods());
};
