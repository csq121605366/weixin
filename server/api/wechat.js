import { getWechat } from '../wechat';

let wechatApi = getWechat();

export async function getSignatureAsync(url) {
    // 获取token
    let data = await wechatApi.fetchAccessToken();
    let token = data.access_token;
    // 获取ticket
    let ticketData = await wechatApi.fetchTicket(token);
    let ticket = ticketData.ticket;
    // 签名
    let params = wechatApi.sign(ticket, url);
    params.appId = wechatApi.appID;
    return params;
}