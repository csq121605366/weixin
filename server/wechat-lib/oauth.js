import request from 'request-promise';
import formstream from 'formstream';
import assign from 'lodash/assign';
import fs from 'fs';
import path from 'path';
// 签名算法
import { sign } from './util';

const baseUrl = 'https://api.weixin.qq.com/sns/oauth2/';
const api = {
    authorize: 'https://open.weixin.qq.com/connect/oauth2/authorize?',
    access_token: baseUrl + 'access_token?',
    refresh_token: baseUrl + 'refresh_token?',
    userInfo: baseUrl + 'userinfo?',

}



export default class WechatOauth {
    constructor(opts) {
        this.appID = opts.appID;
        this.appSecret = opts.appSecret;
    }
    async request(options) {
        options = Object.assign({}, options, { json: true });
        try {
            const response = await request(options);
            return response;
        } catch (error) {
            console.error('request:', error);
        }
    }

    getAuthorizeURL(scope = 'snsapi_base', target, state) {
        let url = `${api.authorize}appid=${this.appID}&redirect_uri=${encodeURIComponent(target)}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
        return url;
    }

    async fetchAccessToken() {
        let url = `${api.access_token}appid=${this.appID}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`;
        let data = await this.request({ url: url });
        return data;
    }

    async getUserInfo(token, openID, lang = 'zh_CN') {
        let url = `${api.userInfo}access_token=${token}&appid=${openID}&lang=${lang}`;
        let data = await this.request({ url });
        return data;
    }

}