import Koa from 'koa';
import { Nuxt, Builder } from 'nuxt';
import R from 'ramda';
import { resolve } from 'path';

const r = path => resolve(__dirname, path);
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 8080;
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env === 'production');

const MIDDLEWARES = ['database', 'router'];


class Server {
    constructor() {
        this.app = new Koa();
        this.useMiddleWare(this.app)(MIDDLEWARES);
    }
    useMiddleWare(app) {
        // 中间件的个数不定，通过 Ramda 的特性，从右往左进行函数组合，右侧函数的返回结果总是左侧函数的输入参数
        // R.map(console.log)([1, 2, 3])
        // MIDDLEWARE 数组交给了 R.map
        // 分别拿到的单个数组中的值，我们可以通过 R.compose 再次进行组合。
        return R.map(R.compose(
            R.map(i => {
                return i(app);
            }),
            require,
            i => `${r('./middlewares')}/${i}`
        ));
    }
    async start() {
        // Instantiate nuxt.js
        const nuxt = new Nuxt(config);
        // Build in development
        if (config.dev) {
            const builder = new Builder(nuxt);
            builder.build().catch(e => {
                console.error(e); // eslint-disable-line no-console
                process.exit(1);
            })
        }
        this.app.use(ctx => {
            ctx.status = 200 // koa defaults to 404 when it sees that status is unset
            return new Promise((resolve, reject) => {
                ctx.res.on('close', resolve);
                ctx.res.on('finish', resolve);
                nuxt.render(ctx.req, ctx.res, promise => {
                    // nuxt.render passes a rejected promise into callback on error.
                    promise.then(resolve).catch(reject);
                })
            })
        })
        this.app.listen(port, host);
        console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
    }
};

// 创建服务器实例
const app = new Server();

// 运行服务器实例
app.start();