import request from 'request-promise';
import assign from 'lodash/assign';
import fs from 'fs';
import path from 'path';

const baseUrl = 'https://api.weixin.qq.com/cgi-bin/';
const api = {
}


export default class WechatOAuth {
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
    async fetchAccessToken() {
        let url = `${api.authorize}appid=${this.appID}&secret=${this.appSecret}&code=${code}&grant_type=authorization_code`;
        return data;
    }
}