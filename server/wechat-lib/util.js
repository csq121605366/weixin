import xml2js from 'xml2js';
import tpl from './tpl';
import formsteam from 'formstream';
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
    console.log(info);
    return tpl(info);
}


export function signIt(nonce, ticket, timestamp, url) {
    let res = {
        ticket,
        nonceStr,
        timestamp,
        url
    }
    let string = raw(ret);
    let sha = sha1(string);
}

export function sign(ticket, url) {
    let nonceStr = createNonce();
    let timestamp = createTimesstamp()
    let signature = signIt(nonce, ticket, timestamp, url);
    return {
        nonceStr,
        timestamp,
        signature
    }
}