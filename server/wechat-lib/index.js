import request from 'request-promise';
const baseUrl = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
    accessToken: baseUrl + 'token?grant_type=client_credential'
}
export default class Wechat {
    constructor(opts) {
        this.opts = Object.assign({}, opts);
        this.appID = opts.appID;
        this.appSecret = opts.appSecret;
        this.getAccessToken = opts.getAccessToken;
        this.saveAccessToken = opts.saveAccessToken;
        this.fetchAccessToken();
    }
    async request(options) {
        options = Object.assign({}, options, { json: true });
        try {
            const response = await request(options);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    async fetchAccessToken() {
        let data = await this.getAccessToken();
        if (!this.isVaildAccessToken(data, 'access_token')) {
            data = await this.updateAccessToken();
        }
        await this.saveAccessToken(data);
        return data
    }
    async updateAccessToken() {
        const url = api.accessToken + '&appid=' + this.appID + '&secret=' + this.appSecret;
        const data = await this.request({ url: url });
        const now = (new Date().getTime());
        const expiresIn = now + (data.expires_in - 20) * 1000;
        data.expires_in = expiresIn;
        return data;
    }
    isVaildAccessToken(data, name) {
        // 检测获取的token是否有效
        if (!data || !data[name] || !data.expires_in) {
            return false;
        }
        // 获取token生成时间
        const expiresIn = data.expires_in;
        // 获取当前时间
        const now = (new Date().getTime());

        if (now < expiresIn) {
            return true;
        } else {
            return false;
        }
    }
}