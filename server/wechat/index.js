import mongoose from 'mongoose';
import config from '../config';
import WechatLib from '../wechat-lib';

const Token = mongoose.model('Token');

const wechatConfig = {
    wechat: {
        appID: config.wechat.appID,
        appSecret: config.wechat.appSecrect,
        token: config.wechat.token,
        getAccessToken: async() => await Token.getAccessToken(),
        saveAccessToken: async(data) => await Token.saveAccessToken(data)
    }
}
export const getWechat = () => {
    const wechatClient = new WechatLib(wechatConfig.wechat);
    return wechatClient;
}