// 服务器api接口层

import Router from "koa-router";
import cors from "koa2-cors";
import { wechatHear, signature, redirect, oauth } from "../controllers/wechat";
import { api } from "../controllers/pages";

export const router = app => {
  const router = new Router();

  router.all("/wechat-hear", wechatHear);

  router.get("/wechat-signature", signature);

  router.get("/wechat-redirect", redirect);

  router.get("/wechat-oauth", oauth);

  router.get("/api/:type", api);
  // router.get("/api/characters", api);
  // router.get("/api/cities", api);
  // router.get("/api/characters/detail", api);
  // router.get("/api/houses/detail", api);
  // router.get("/api/products", api);

  // 实现跨域
  app.use(
    cors({
      origin: function(ctx) {
        if (/\/api\//.test(ctx.url)) {
          return "http://localhost:8080";// 这样就能只允许 http://localhost:8080 这个域名的请求了
        }
        return false;  // 不允许来自所有域名请求
      },
      exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
      maxAge: 5,
      credentials: true,
      allowMethods: ["GET", "POST", "DELETE"],
      allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
  );

  app.on("error", err => {
    console.error("server error", err);
  });
  // allowedMethods 当请求出错时的处理逻辑 那这个函数其实就是当所有中间件函数执行完了，并且请求出错了进行相应的处理：
  // 如果请求的方法koa-router不支持并且没有设置throw选项，则返回 501(未实现) 如果是options请求，则返回 204(无内容)
  // 如果请求的方法支持但没有设置throw选项，则返回 405(不允许此方法 )
  app.use(router.routes()).use(router.allowedMethods());
};
