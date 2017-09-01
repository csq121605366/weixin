import xml2js from 'xml2js';
import tpl from './tpl';
import sha1 from 'sha1';

export function parseXML(xml) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xml, { trim: true }, (err, content) => {
            if (err) reject(err);
            else resolve(content);
        })
    })
}

export function formatMessage(res) {
    let message = {};
    if (typeof res === 'object') {
        let keys = Object.keys(res);

        for (let i = 0; i < keys.length; i++) {
            let item = res[keys[i]];
            let key = keys[i];

            if (!(item instanceof Array) || item.length === 0) {
                continue;
            }
            if (item.length === 1) {
                let val = item[0];
                if (typeof val === 'object') {
                    message[key] = formatMessage(val);
                } else {
                    message[key] = (val || '').trim();
                }
            } else {
                message[key] = [];
                for (let j = 0; j < item.length; j++) {
                    message[key].push(formatMessage(item[j]));
                }
            }
        }
    }
    return message;
}

export function template(content, message) {
    // content回复内容，message解析后的消息
    let info = {};
    let type = 'text';
    content = content || 'Empty News';
    if (content && content.type) {
        type = content.type;
    }
    if (Array.isArray(content)) {
        type = 'news';
    }
    info = Object.assign({}, {
        content: content,
        createTime: new Date().getTime(),
        msgType: type,
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName
    })
    return tpl(info);
}


/**
 * 创建随机字符串
 */
function createNonce() {
    return Math.random().toString(36).substr(2, 15);
}

/**
 * 创建时间戳
 */
function createTimesstamp() {
    return parseInt(new Date().getTime() / 1000) + '';
}

/**
 * 签名格式化
 * @param {*} args 参数
 */
function raw(args) {
    let keys = Object.keys(args);
    let newArgs = {};
    let str = '';
    console.log(keys)
    keys = keys.sort();
    console.log(keys)
    keys.forEach((key) => {
        newArgs[key.toLowerCase()] = args[key]
    });
    for (let k in newArgs) {
        str += '&' + k + '=' + newArgs[k]
    }
    return str.substr(1);
}

/**
 * 加密
 * @param {*} nonceStr 随机字符串
 * @param {*} ticket 签名
 * @param {*} timestamp 时间戳 
 * @param {*} url 地址
 */
function signIt(nonceStr, ticket, timestamp, url) {
    let ret = {
        jsapi_ticket: ticket,
        nonceStr,
        timestamp,
        url
    }
    let string = raw(ret);
    let sha = sha1(string);
    return sha;
}

/**
 * 签名
 * @param {*} ticket 
 * @param {*} url 
 */
export function sign(ticket, url) {
    let nonceStr = createNonce();
    let timestamp = createTimesstamp();
    let signature = signIt(nonceStr, ticket, timestamp, url);
    return {
        nonceStr,
        timestamp,
        signature
    }
}