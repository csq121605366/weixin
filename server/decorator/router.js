import Router from 'koa-router';
import {resolve} from 'path';
import glob from 'glob';

export let routersMap = new Map();
export const symbolPrefix = Symbol('prefix');

// 格式化路径字符串
export const normalizePath = path => path.startsWith('/')
    ? path
    : `/${path}`;

export default class Route {
    constructor(app, apiPath) {
        this.app = app;
        this.apiPath = apiPath;
        this.router = new Router();
    }
    // 实现跨域
    cors() {
        let cors = require("koa2-cors");
        this
            .app
            .use(cors({
                origin: function (ctx) {
                    if (/\/api\//.test(ctx.url)) {
                        return
                        "http://localhost:8080"; // 这样就能只允许 http://localhost:8080 这个域名的请求了
                    }
                    return false; // 不允许来自所有域名请求
                },
                exposeHeaders: [
                    "WWW-Authenticate", "Server-Authorization"
                ],
                maxAge: 5,
                credentials: true,
                allowMethods: [
                    "GET", "POST", "DELETE"
                ],
                allowHeaders: ["Content-Type", "Authorization", "Accept"]
            }));
    }
    init() {
        glob
            .sync(resolve(this.apiPath, './*.js'))
            .forEach(require);
        for (let [conf,
            controller]of routersMap.entries()) {
            const controllers = Array.isArray(controller)
                ? controller
                : [controller];
            let prefixPath = conf.target[symbolPrefix]
            if (prefixPath) 
                prefixPath = normalizePath(prefixPath)
            const routerPath = prefixPath + conf.path
            this.router[conf.method](routerPath, ...controllers)
        }
        this
            .app
            .use(this.router.routes())
        this
            .app
            .use(this.router.allowedMethods());
    }
}
export const router = conf => (target, key, desc) => {
    conf.path = normalizePath(conf.path)
    routersMap.set({
        target,
        ...conf
    }, target[key])
}

export const controller = path => target => target.prototype[symbolPrefix] = path

export const get = path => router({method: 'get', path})
export const post = path => router({method: 'post', path})
export const all = path => router({method: 'all', path})